import { Button } from 'antd'
import { FC } from 'react'
import { Task } from '../types/task.type'
import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import Checkbox from 'antd/es/checkbox/Checkbox'
import axios, { AxiosError } from 'axios'
import { toast } from 'sonner'

type TaskLineProps = {
  task: Task
  addToBulkTasks: (id: string) => void
  bulkTasks: string[]
  handleLoad: () => void
}

const TaskLine: FC<TaskLineProps> = ({ task, addToBulkTasks, bulkTasks, handleLoad }) => {
  const deleteTask = (id: string) => {
    void axios
      .delete(`http://localhost:3000/api/tasks/${id}`)
      .then(() => {
        handleLoad()
      })
      .catch((err: AxiosError<{ message: string }>) => {
        if (err.response?.data?.message) {
          toast.error(err.response.data.message)
        } else {
          toast.error('An error occurred')
        }
      })
  }

  const updateTask = (task: Task) => {
    void axios
      .patch(`http://localhost:3000/api/tasks/${task.id}`, { ...task })
      .then(() => {
        handleLoad()
      })
      .catch((err: AxiosError<{ message: string }>) => {
        if (err.response?.data?.message) {
          toast.error(err.response.data.message)
        } else {
          toast.error('An error occurred')
        }
      })
  }

  return (
    <div
      key={task.id}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        borderBottom: task.isDone ? '2px solid green' : '1px solid #ccc',
        opacity: task.isDone ? 0.3 : 1,
        position: 'relative',
        padding: '8px 0',
      }}
    >
      <div style={{ display: 'flex', gap: '8px' }}>
        <Checkbox checked={bulkTasks.includes(task.id)} onChange={() => addToBulkTasks(task.id)} />
        <div style={{ margin: 'auto 0' }}>
          {task.isDone ? (
            <CheckCircleOutlined
              style={{ color: 'green', fontSize: '20px' }}
              onClick={() => updateTask({ ...task, isDone: !task.isDone })}
            />
          ) : (
            <CloseCircleOutlined
              style={{ fontSize: '20px' }}
              onClick={() => updateTask({ ...task, isDone: !task.isDone })}
            />
          )}
        </div>
        <h2 style={{ margin: 'auto 0' }}>{task.title}</h2>
      </div>
      <div style={{ display: 'flex', gap: '4px' }}>
        <Button onClick={() => updateTask(task)} disabled={!task.canEdit}>
          Update
        </Button>
        <Button onClick={() => deleteTask(task.id)} disabled={!task.canDelete}>
          Delete
        </Button>
      </div>
      {task.isDone && (
        <div
          style={{
            position: 'absolute',
            top: '50%',
            left: 0,
            right: 0,
            borderTop: '2px solid green',
            transform: 'translateY(-50%)',
          }}
        />
      )}
    </div>
  )
}

export default TaskLine
