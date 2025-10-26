import { prisma } from '@/prisma/client'
import { NextRequest, NextResponse } from 'next/server'
import { issueSchema } from '../../validationSchemas'

export async function POST(req: NextRequest) {
	const body = await req.json()
	// Logic to create a new issue in the database
	const validation = issueSchema.safeParse(body)
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

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export async function GET(req: NextRequest) {
	const issues = await prisma.issue.findMany()
	return NextResponse.json(issues, { status: 200 })
}
