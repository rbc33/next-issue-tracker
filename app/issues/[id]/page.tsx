import authOptions from '@/app/api/auth/[...nextauth]/authOptions'
import { prisma } from '@/prisma/client'
import { Box, Flex, Grid } from '@radix-ui/themes'
import { getServerSession } from 'next-auth'
import { notFound, redirect } from 'next/navigation'
import DeleteIssueButton from './DeleteIssueButton'
import EditIssueButton from './EditIssueButton'
import IssueDetails from './IssueDetails'
import AssigneeSelect from './AssigneeSelect'
import { cache } from 'react'

interface Props {
	params: Promise<{ id: string }>
}

const fetchIssue = cache((issueId: number) =>
	prisma.issue.findUnique({ where: { id: issueId } })
)

const IssueDetailPage = async ({ params }: Props) => {
	const session = await getServerSession(authOptions)
	if (!session) redirect('/api/auth/signin')
	const { id } = await params
	const issue = await fetchIssue(parseInt(id))
	if (!issue) notFound()

	return (
		<Grid columns={{ initial: '1', sm: '5' }} gap="5">
			<Box className="md:col-span-4">
				<IssueDetails issue={issue} />
			</Box>
			{session && (
				<Box>
					<Flex direction="column" gap="4">
						<AssigneeSelect issue={issue} />
						<EditIssueButton issueId={issue.id} />
						<DeleteIssueButton issueId={issue.id} />
					</Flex>
				</Box>
			)}
		</Grid>
	)
}

export async function generateMetadata({ params }: Props) {
	const { id } = await params
	const issue = await fetchIssue(parseInt(id))

	return {
		title: issue?.title,
		descrption: 'Details of issue' + issue?.id,
	}
}

export default IssueDetailPage
