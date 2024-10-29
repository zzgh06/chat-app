import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, email, password } = body;

    if (!name || !email || !password) {
      return new NextResponse('필드가 누락되었습니다.', { status: 400 });
    }

    if (password.length < 6) {
      return new NextResponse('패스워드가 6자 미만입니다.', { status: 400 });
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      return new NextResponse('잘못된 이메일 형식입니다.', { status: 400 });
    }

    const existingUser = await prisma.user.findUnique({
      where: { email }
    });

    if (existingUser) {
      return new NextResponse('해당 이메일이 이미 존재합니다.', { status: 409 });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword
      }
    });

    return NextResponse.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email
      }
    });
  } catch(error) {
    console.error('SIGNUP_ERROR', error);
    return new NextResponse('Internal Error', { status: 500 });
  }
}