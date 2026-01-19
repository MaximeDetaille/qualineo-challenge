import { Button } from 'antd'
import axios, { AxiosError } from 'axios'
import { FC } from 'react'
import { toast } from 'sonner'

const BulkEditSection: FC<{ bulkTasksIds: string[]; handleLoad: () => void }> = ({
  bulkTasksIds,
  handleLoad,
}) => {
  const bulkDeleteTasks = () => {
    void axios
      .delete('http://localhost:3000/api/tasks/bulk', {
        data: {
          ids: bulkTasksIds,
        },
      })
      .then(() => {
        handleLoad()
      })
      .catch((err: AxiosError<{ message: string }>) => {
        toast.error(err.response?.data?.message || 'An error occurred')
      })
  }

  return (
    <>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: '4px',
          marginTop: '20px',
          marginBottom: '20px',
        }}
      >
        <h2>{bulkTasksIds.length} tasks selected</h2>
        <div>
          <Button onClick={bulkDeleteTasks}>Delete {bulkTasksIds.length} tasks</Button>
        </div>
      </div>
      <hr />
    </>
  )
}

export default BulkEditSection
