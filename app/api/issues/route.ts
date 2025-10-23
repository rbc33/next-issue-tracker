import { prisma } from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'

const createIssueSchema = z.object({
	title: z.string().min(1, 'Tilte is required').max(255),
	description: z.string().min(1, 'Description is required'),
})

export async function POST(req: NextRequest) {
	const body = await req.json()
	// Logic to create a new issue in the database
	const validation = createIssueSchema.safeParse(body)
	if (!validation.success)
		return NextResponse.json(validation.error.issues, { status: 400 })
	const newIssue = await prisma.issue.create({
		data: {
			title: body.title,
			description: body.description,
		},
	})
	return NextResponse.json(newIssue, { status: 201 })
}
