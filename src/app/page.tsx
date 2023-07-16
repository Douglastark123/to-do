'use client'
import 'remixicon/fonts/remixicon.css'
import { useEffect, useState } from 'react'

import Form from './components/Form'
import { DBTaskProps } from '@/db'

const Loading = () => (
  <li>
    <p className="p-2 text-center font-semibold">Loading...</p>
  </li>
)

const NoData = () => (
  <li>
    <p className="p-2 text-center font-medium">No To-Dos</p>
  </li>
)

export interface ActionProps {
  isFormOpen: boolean
  name: null | 'add' | 'edit'
  task_id: null | string
}

const Page = () => {
  const [data, setData] = useState<null | DBTaskProps[]>(null)
  const [isLoading, setLoading] = useState(false)
  const [action, setAction] = useState<ActionProps>({
    isFormOpen: true,
    name: 'add',
    task_id: null,
  })

  // {
  //   isFormOpen: false,
  //   name: null,
  //   task_id: null,
  // }

  const Task = ({ task }: { task: DBTaskProps }) => (
    <li
      className={`flex gap-2 ${task.done ? 'opacity-50' : false} items-center`}
    >
      {task.done ? (
        <i className="ri-checkbox-line text-2xl" />
      ) : (
        <i className="ri-checkbox-blank-line text-2xl" />
      )}

      <p
        className={`${
          task.done ? 'line-through' : false
        } flex-1 rounded-md bg-yellow-200 px-5 py-1`}
      >
        {task.task}
      </p>

      <span className="flex gap-2 p-1">
        <i className="ri-expand-up-down-fill text-xl" />
        <button
          onClick={(e) => {
            e.preventDefault()
            setAction({ isFormOpen: true, name: 'edit', task_id: task.id })
          }}
        >
          <i className="ri-edit-box-line text-xl text-teal-500" />
        </button>
        <button>
          <i className="ri-delete-bin-6-line text-xl text-red-600" />
        </button>
      </span>
    </li>
  )

  useEffect(() => {
    setLoading(true)
    fetch('/api')
      .then((res) => res.json())
      .then(({ tasks }) => {
        setData(tasks)
        setLoading(false)
      })
  }, [])

  return (
    <>
      <main className="flex w-full min-w-[280px] max-w-[460px] flex-col gap-3">
        <h1 className="text-2xl font-bold">To-Do</h1>
        <ul className="flex flex-col gap-1 border-2 border-black p-4">
          <li
            className={`flex border border-black font-bold opacity-50
          hover:bg-black hover:text-yellow-50 hover:opacity-100`}
          >
            <button
              className="flex-1 p-1"
              onClick={(e) => {
                e.preventDefault()
                setAction({ isFormOpen: true, name: 'add', task_id: null })
              }}
            >
              Add task
            </button>
          </li>
          {isLoading ? (
            <Loading />
          ) : !isLoading && data !== null ? (
            data.map((task) => <Task task={task} key={task.id} />)
          ) : (
            <NoData />
          )}
        </ul>
      </main>
      <Form action={action} />
    </>
  )
}

export default Page
