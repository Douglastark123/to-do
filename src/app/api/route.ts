import DB from '@/db'
import { NextResponse } from 'next/server'

const db = new DB()

export async function GET(req: Request) {
  return NextResponse.json(await db.read())
}

export async function POST(req: Request) {
  const data: {
    task: string
    done: boolean
  } = await req.json()

  await db.newTask(data)

  return NextResponse.json({ msg: 'Task successfully added!' })
}
