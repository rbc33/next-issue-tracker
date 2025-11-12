import { prisma } from '@/prisma/client'
import { Status } from '@prisma/client'
import Pagination from '../components/Pagination'
import IssueActions from './IssueActions'
import IssueTable, { columnNames, IssueQuery } from './IssueTable'
import { Flex } from '@radix-ui/themes'
import { Metadata } from 'next'

interface Props {
	searchParams: Promise<IssueQuery>
}

const IssuesPage = async ({ searchParams }: Props) => {
	const params = await searchParams
	console.log('Status:', params.status)

	const statuses = Object.values(Status)
	const status = statuses.includes(params.status!) ? params.status : undefined
	const where = { status }

	const orderBy = columnNames.includes(params.orderBy!)
		? { [params.orderBy!]: params.in ? params.in : 'asc' }
		: undefined

	const page = parseInt(params.page) || 1

	const pageSize = 10

	const issues = await prisma.issue.findMany({
		where,
		orderBy,
		skip: (page - 1) * pageSize,
		take: pageSize,
	})
	const issueCount = await prisma.issue.count({ where })

	const filteredIssues = params.search
		? issues.filter(
				(issue) =>
					issue.title.toLowerCase().includes(params.search!.toLowerCase())
				// || issue.description.toLowerCase().includes(params.search!.toLowerCase())
		  )
		: issues

	return (
		<Flex direction="column">
			<IssueActions />
			<IssueTable params={params} issues={filteredIssues} />
			<Pagination
				pageSize={pageSize}
				currentPage={page}
				itemCount={issueCount}
				// itemCount={filteredIssues.length}
			/>
		</Flex>
	)
}

export const dynamic = 'force-dynamic'
// export const revalidate = 60 // set to 0 equals dynamic = "force-dynamic"

export default IssuesPage

export const metadata: Metadata = {
	title: 'Issue Tracker - Issue List',
	description: 'View all project issues',
}
