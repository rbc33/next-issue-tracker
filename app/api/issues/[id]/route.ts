import { issueSchema } from '@/app/validationSchemas'
import { prisma } from '@/prisma/client'
import { getServerSession } from 'next-auth'
import { NextRequest, NextResponse } from 'next/server'
import authOptions from '../../auth/[...nextauth]/authOptions'

export async function PATCH(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const session = await getServerSession(authOptions)
	if (!session) return NextResponse.json({}, { status: 401 })
	const { id } = await params
	const body = await req.json()
	const validation = issueSchema.safeParse(body)

	if (!validation.success)
		return NextResponse.json(validation.error.issues, { status: 400 })

	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(id) },
	})
	if (!issue)
		return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 })
	const updatedIssue = await prisma.issue.update({
		where: { id: issue.id },
		data: {
			title: body.title,
			description: body.description,
			status: body.status,
		},
	})
	return NextResponse.json(updatedIssue, { status: 200 })
}

export async function DELETE(
	req: NextRequest,
	{ params }: { params: Promise<{ id: string }> }
) {
	const session = await getServerSession(authOptions)
	if (!session) return NextResponse.json({}, { status: 401 })

	const { id } = await params
	const issue = await prisma.issue.findUnique({
		where: { id: parseInt(id) },
	})
	if (!issue)
		return NextResponse.json({ error: 'Invalid Issue' }, { status: 404 })
	await prisma.issue.delete({
		where: { id: issue.id },
	})
	return NextResponse.json({})
}
