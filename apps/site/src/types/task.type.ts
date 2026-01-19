export type Task = {
  id: string
  title: string
  isDone?: boolean
  canRead?: boolean
  canEdit?: boolean
  canDelete?: boolean
}
