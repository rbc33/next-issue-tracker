import { Box } from '@radix-ui/themes'
import React from 'react'
import { Skeleton } from '@/app/components'

const IssueFormSkeleton = () => {
	return (
		<Box className="max-w-xl">
			<Skeleton width="50vw" height="2rem" />
			<Skeleton height="20rem" />
		</Box>
	)
}

export default IssueFormSkeleton
