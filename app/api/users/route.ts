import { prisma } from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
	const users = await prisma.user.findMany({
		orderBy: { name: 'asc' },
	})

	return NextResponse.json(users, { status: 200 })
}
