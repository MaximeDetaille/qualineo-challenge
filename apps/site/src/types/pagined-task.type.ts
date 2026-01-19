import { Task } from './task.type'

export type PaginedTask = {
  totalItems: number
  tasks: Task[]
}
