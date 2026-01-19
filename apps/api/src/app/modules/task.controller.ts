import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common'
import { TaskService } from './task.service'
import { TaskEntity } from './task.entity'
import { GetTasksDto } from './dto/task.dto'

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  public async getAll(@Query() query: GetTasksDto) {
    return this.taskService.getAll(query)
  }

  @Delete('bulk')
  public async deleteBulkTasks(@Body() body: { ids: string[] }) {
    return this.taskService.deleteBulk(body.ids)
  }

  @Get(':id')
  public async getById(@Param('id') id: string) {
    return this.taskService.getById(id)
  }

  @Post()
  public async createTask(@Body() body: Omit<TaskEntity, 'id'>) {
    return this.taskService.create({
      ...body,
    })
  }

  @Patch(':id')
  public async updateTask(@Param('id') id: string, @Body() body: Partial<Omit<TaskEntity, 'id'>>) {
    return this.taskService.update(id, { ...body })
  }

  @Delete(':id')
  public async deleteTask(@Param('id') id: string) {
    return this.taskService.delete(id)
  }
}
