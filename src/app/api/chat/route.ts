import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function GET(req: Request) {
  try {
    const rooms = await prisma.room.findMany({
      include: {
        users: true,
        messages: {
          include: {
            user: true,
          },
        },
      },
    })
    return NextResponse.json(rooms)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
}