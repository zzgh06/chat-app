import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(request: Request) {
  try {
    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        status: true,
      },
    });
    
    return NextResponse.json(users);
  } catch (error) {
    console.error(error)
    return new NextResponse('Internal Error', { status: 500 });
  }
}