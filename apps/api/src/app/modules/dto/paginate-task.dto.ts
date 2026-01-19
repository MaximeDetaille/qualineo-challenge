import { IsArray, IsInt } from 'class-validator'
import { TaskEntity } from '../task.entity'

export class PaginateTaskDto {
  @IsInt()
  totalItems: number

  @IsArray()
  tasks: TaskEntity[]
}
