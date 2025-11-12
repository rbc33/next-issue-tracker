import { prisma } from '@/prisma/client'
import { Status } from '@prisma/client'
import Pagination from '../components/Pagination'
import IssueActions from './IssueActions'
import IssueTable, { columnNames, IssueQuery } from './IssueTable'
import { Flex } from '@radix-ui/themes'

interface Props {
	searchParams: IssueQuery
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

	return (
		<Flex direction="column" gap="3">
			<IssueActions />
			<IssueTable params={params} issues={issues} />
			<Pagination
				pageSize={pageSize}
				currentPage={page}
				itemCount={issueCount}
			/>
		</Flex>
	)
}

export const dynamic = 'force-dynamic'
// export const revalidate = 60 // set to 0 equals dynamic = "force-dynamic"

export default IssuesPage
