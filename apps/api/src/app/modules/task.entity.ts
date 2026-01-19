import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm'

@Entity('Tasks')
export class TaskEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column({ type: 'varchar', length: 255 })
  title: string

  @Column({ type: 'boolean', default: false })
  isDone?: boolean

  @Column({ type: 'boolean', default: false })
  canRead?: boolean

  @Column({ type: 'boolean', default: false })
  canEdit?: boolean

  @Column({ type: 'boolean', default: false })
  canDelete?: boolean

  @Column({ type: 'datetime', default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date
}
