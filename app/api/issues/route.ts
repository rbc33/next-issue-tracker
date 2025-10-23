import { prisma } from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { createIssueSchema } from '../../validationSchemas'

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
