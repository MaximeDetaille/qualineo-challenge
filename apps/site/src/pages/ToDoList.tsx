import { CheckCircleOutlined, CloseCircleOutlined } from '@ant-design/icons'
import axios from 'axios'
import { FC, useEffect, useMemo, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'

type Task = {
  id: string
  title: string
  isDone?: boolean
}

export const ToDoList: FC = () => {
  const [newTask, setNewTask] = useState<string>('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [search, setSearch] = useState<string>('')

  const handleLoad = () => {
    void axios.get<Task[]>('http://localhost:3000/api/tasks').then(({ data }) => {
      setTasks(data)
    })
  }

  const addTask = () => {
    axios
      .post('http://localhost:3000/api/tasks', { title: newTask, isDone: false })
      .then(() => {
        handleLoad()
      })
      .catch((err) => {
        console.error(err)
      })
  }

  const updateTaskIsDone = (id: string, isDone: boolean) => {
    void axios.patch(`http://localhost:3000/api/tasks/${id}`, { isDone }).then(() => {
      handleLoad()
    })
  }

  const deleteTask = (id: string) => {
    void axios.delete(`http://localhost:3000/api/tasks/${id}`).then(() => {
      handleLoad()
    })
  }

  const toDoTasks = useMemo(() => {
    return [...tasks.filter(({ isDone }) => !isDone)]
  }, [tasks])

  const doneTasks = useMemo(() => {
    return [...tasks.filter(({ isDone }) => !!isDone)]
  }, [tasks])

  useEffect(() => {
    handleLoad()
  }, [])

  return (
    <div>
      <h1>ToDoList</h1>
      <div style={{ display: 'flex', flexWrap: 'nowrap', gap: '4px' }}>
        <div>
          <Input
            placeholder="Search task"
            value={search}
            onChange={(e: { target: { value: string } }) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ width: '200px' }}>
          <Input
            type="text"
            value={newTask}
            onChange={(e: { target: { value: string } }) => setNewTask(e.target.value)}
          />
        </div>
        <Button onClick={addTask}>Add task</Button>
      </div>
      <hr />
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h2>To-Do</h2>
        {toDoTasks
          .filter(({ title }) =>
            search.length > 0 ? title.toLowerCase().includes(search.toLowerCase()) : true,
          )
          .map((task) => {
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
                  <div style={{ margin: 'auto 0' }}>
                    {task.isDone ? (
                      <CheckCircleOutlined
                        style={{ color: 'green', fontSize: '20px' }}
                        onClick={() => updateTaskIsDone(task.id, !task.isDone)}
                      />
                    ) : (
                      <CheckCircleOutlined
                        style={{ fontSize: '20px' }}
                        onClick={() => updateTaskIsDone(task.id, !task.isDone)}
                      />
                    )}
                  </div>
                  <h2 style={{ margin: 'auto 0' }}>{task.title}</h2>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <Button onClick={() => console.log('update')}>Update</Button>
                  <Button onClick={() => deleteTask(task.id)}>Delete</Button>
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
          })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <h2>Done</h2>
        {doneTasks
          .filter(({ title }) =>
            search.length > 0 ? title.toLowerCase().includes(search.toLowerCase()) : true,
          )
          .map((task) => {
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
                  <div style={{ margin: 'auto 0' }}>
                    {task.isDone ? (
                      <CheckCircleOutlined
                        style={{ color: 'green', fontSize: '20px' }}
                        onClick={() => updateTaskIsDone(task.id, !task.isDone)}
                      />
                    ) : (
                      <CloseCircleOutlined
                        style={{ fontSize: '20px' }}
                        onClick={() => updateTaskIsDone(task.id, !task.isDone)}
                      />
                    )}
                  </div>
                  <h2 style={{ margin: 'auto 0' }}>{task.title}</h2>
                </div>
                <div style={{ display: 'flex', gap: '4px' }}>
                  <Button onClick={() => console.log('update')}>Update</Button>
                  <Button onClick={() => deleteTask(task.id)}>Delete</Button>
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
          })}
      </div>
    </div>
  )
}
