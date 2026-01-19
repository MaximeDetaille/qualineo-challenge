import { ForbiddenException, Injectable, NotFoundException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { In, Raw, Repository } from 'typeorm'
import { TaskEntity } from './task.entity'
import { GetTasksDto } from './dto/task.dto'
import { PaginateTaskDto } from './dto/paginate-task.dto'

@Injectable()
export class TaskService {
  constructor(
    @InjectRepository(TaskEntity)
    private readonly taskRepository: Repository<TaskEntity>,
  ) {}

  public async getAll(input?: GetTasksDto): Promise<PaginateTaskDto> {
    // Construire les critères de recherche (sans pagination)
    const whereOptions = input?.search
      ? {
          title: Raw((alias) => `LOWER(${alias}) LIKE LOWER(:search)`, {
            search: `%${input.search}%`,
          }),
        }
      : {}

    const totalItems = await this.taskRepository.count({
      where: whereOptions,
    })

    // Construire les options avec pagination pour la requête find
    const findOptions = input
      ? {
          where: whereOptions,
          skip: input.skip ?? undefined,
          take: input.take ?? undefined,
          order: {
            createdAt: 'DESC' as const,
          },
        }
      : undefined

    const tasks = await this.taskRepository.find(findOptions)

    return {
      totalItems,
      tasks,
    }
  }

  public async getById(id: string): Promise<TaskEntity | null> {
    return this.taskRepository.findOne({ where: { id } })
  }

  public async create(task: Omit<TaskEntity, 'id'>): Promise<TaskEntity> {
    const newTask = this.taskRepository.create(task)
    return this.taskRepository.save(newTask)
  }

  public async update(id: string, task: Partial<Omit<TaskEntity, 'id'>>): Promise<TaskEntity> {
    const previousTask = await this.taskRepository.findOne({ where: { id } })
    if (!previousTask) {
      throw new Error(`Task with id ${id} not found`)
    }

    if (!previousTask.canEdit) {
      throw new ForbiddenException(`Task with name "${previousTask.title}" cannot be edited`)
    }

    const newTask = this.taskRepository.create({ ...previousTask, ...task })
    await this.taskRepository.update(id, newTask)

    return newTask
  }

  public async delete(id: string): Promise<void> {
    const task = await this.taskRepository.findOne({ where: { id } })

    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`)
    }

    if (!task.canDelete) {
      throw new ForbiddenException(`Task with name "${task.title}" cannot be deleted`)
    }

    await this.taskRepository.delete(id)
  }

  public async deleteBulk(ids: string[]): Promise<void> {
    const tasks = await this.taskRepository.find({ where: { id: In(ids) } })

    const undelteableTasks: string[] = []

    tasks.forEach((task) => {
      if (!task.canDelete) {
        undelteableTasks.push(`Task with name "${task.title}" cannot be deleted`)
      }
    })

    if (undelteableTasks.length > 0) {
      throw new ForbiddenException(undelteableTasks.join('\n'))
    }

    await this.taskRepository.delete(ids)
  }
}
