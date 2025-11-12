'use client'
import { TextField } from '@radix-ui/themes'
import { useRouter, useSearchParams } from 'next/navigation'

const IssueSearch = () => {
	const router = useRouter()

	const searchParams = useSearchParams()

	return (
		<TextField.Root
			variant="surface"
			placeholder="Search..."
			onChange={(e) => {
				const params = new URLSearchParams()
				if (e.target.value) params.append('search', e.target.value)
				if (searchParams.get('status'))
					params.append('status', searchParams.get('status')!)
				if (searchParams.get('orderBy'))
					params.append('orderBy', searchParams.get('orderBy')!)
				const query = params.size ? '?' + params.toString() : ''
				router.push('/issues' + query)
			}}
		/>
	)
}

export default IssueSearch
