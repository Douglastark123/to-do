import path from 'path'
import { readFile, writeFile } from 'fs/promises'
import { v4 as uuidv4 } from 'uuid'

export interface DBTaskProps {
  id: string
  task: string
  done: boolean
}

interface DBI {
  tasks: DBTaskProps[]
}

class Task implements DBTaskProps {
  readonly id: string = uuidv4()
  task: string
  done: boolean

  constructor(task: string, done: boolean) {
    this.task = task
    this.done = done
  }
}

class DB {
  #dir = path.join(process.cwd(), 'db')
  #filename = '/data.json'

  #file_url = path.join(this.#dir, this.#filename)

  read = async (): Promise<DBI> =>
    JSON.parse(await readFile(this.#file_url, 'utf8'))

  #write = async (input: any) => {
    const data = JSON.stringify(input)
    await writeFile(this.#file_url, data)
  }

  newTask = async (t: { task: string; done: boolean }) => {
    const data = await this.read()

    const newTask = new Task(t.task, t.done)

    data.tasks.push(newTask)

    await this.#write(data)
  }
}

export default DB
