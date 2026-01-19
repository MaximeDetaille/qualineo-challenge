import axios, { AxiosError } from 'axios'
import { FC, useEffect, useMemo, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { Task } from '../types/task.type'
import { PaginedTask } from '../types/pagined-task.type'
import TaskLine from '../components/TaskLine'
import BulkEditSection from '../components/BulkEditSection'

const DEFAULT_PAGE_SIZE = 5

export const ToDoList: FC = () => {
  const [newTask, setNewTask] = useState<string>('')
  const [tasks, setTasks] = useState<Task[]>([])
  const [search, setSearch] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(0)
  const [totalItems, setTotalItems] = useState<number>(0)
  const [pageSize, setPageSize] = useState<number>(DEFAULT_PAGE_SIZE)
  const [bulkTasksIds, setBulkTasksIds] = useState<string[]>([])

  const fetchTasks = () => {
    void axios
      .get<PaginedTask>(
        `http://localhost:3000/api/tasks?search=${search}&skip=${currentPage * pageSize}&take=${pageSize}`,
      )
      .then(({ data }) => {
        setTasks(data.tasks)
        setTotalItems(data.totalItems)
      })
  }

  const handleLoad = () => {
    fetchTasks()
  }

  const addTask = () => {
    axios
      .post('http://localhost:3000/api/tasks', {
        title: newTask,
        isDone: false,
        canEdit: true,
        canDelete: true,
      })
      .then(() => {
        handleLoad()
      })
      .catch((err: AxiosError) => {
        console.error(err)
      })
  }

  const toDoTasks = useMemo(() => {
    return [...tasks.filter(({ isDone }) => !isDone)]
  }, [tasks])

  const doneTasks = useMemo(() => {
    return [...tasks.filter(({ isDone }) => !!isDone)]
  }, [tasks])

  const handlePreviousPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
      setSearch('')
    }
  }

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1)
    setSearch('')
  }

  const addToBulkTasks = (id: string) => {
    if (bulkTasksIds.includes(id)) {
      return setBulkTasksIds(bulkTasksIds.filter((taskId) => taskId !== id))
    }

    setBulkTasksIds([...bulkTasksIds, id])
  }

  useEffect(() => {
    handleLoad()
  }, [])

  useEffect(() => {
    fetchTasks()
  }, [search, currentPage, pageSize])

  return (
    <div>
      <h1>ToDoList</h1>
      <div
        style={{ display: 'flex', flexWrap: 'nowrap', gap: '4px', justifyContent: 'space-between' }}
      >
        <div>
          <Input
            placeholder="Search task"
            value={search}
            onChange={(e: { target: { value: string } }) => setSearch(e.target.value)}
          />
        </div>
        <div style={{ display: 'flex', gap: '4px', paddingBottom: '20px' }}>
          <Input
            type="text"
            value={newTask}
            onChange={(e: { target: { value: string } }) => setNewTask(e.target.value)}
          />
          <Button onClick={addTask}>Add</Button>
        </div>
      </div>
      <hr />
      {bulkTasksIds.length > 0 && (
        <BulkEditSection bulkTasksIds={bulkTasksIds} handleLoad={handleLoad} />
      )}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '20px' }}>
        <h2>To-Do</h2>
        {toDoTasks.map((task) => {
          return (
            <TaskLine
              key={task.id}
              task={task}
              addToBulkTasks={addToBulkTasks}
              bulkTasks={bulkTasksIds}
              handleLoad={handleLoad}
            />
          )
        })}
      </div>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '4px', marginTop: '20px' }}>
        <h2>Done</h2>
        {doneTasks.map((task) => {
          return (
            <TaskLine
              key={task.id}
              task={task}
              addToBulkTasks={addToBulkTasks}
              bulkTasks={bulkTasksIds}
              handleLoad={handleLoad}
            />
          )
        })}
      </div>
      <div className="flex flex-col justify-center gap-6">
        <div className="text-center">
          Page {currentPage + 1}/{Math.ceil(totalItems / pageSize)}
        </div>
        <div className="flex flex-row justify-center items-center gap-1">
          <p className="m-0">Items per page:</p>
          <div className="flex flex-row gap-1">
            <Input
              type="number"
              value={pageSize.toString()}
              onChange={(e: { target: { value: string } }) => {
                const value = Number(e.target.value)

                if (value > 0) {
                  setPageSize(value)
                }
              }}
            />
          </div>
        </div>
        <div className="flex flex-row justify-center gap-4">
          <div>
            <Button disabled={currentPage === 0} onClick={() => handlePreviousPage()}>
              Previous page
            </Button>
          </div>
          <div>
            <Button
              disabled={currentPage === Math.ceil(totalItems / pageSize) - 1}
              onClick={() => handleNextPage()}
            >
              Next page
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
