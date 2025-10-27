'use client'
// import { Pencil2Icon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ca } from 'zod/v4/locales'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	const router = useRouter()
	const [error, setError] = useState<boolean>(false)
	const deleteIssue = async () => {
		try {
			await axios.delete('/api/issues/' + issueId)
			router.push('/issues')
			router.refresh()
		} catch (error) {
			setError(true)
		}
	}
	return (
		<>
			<AlertDialog.Root>
				<AlertDialog.Trigger>
					<Button color="red">Delete issue</Button>
				</AlertDialog.Trigger>
				<AlertDialog.Content>
					<AlertDialog.Title>Confirm deletion?</AlertDialog.Title>
					<AlertDialog.Description>
						Are you sure you want to delete this issue?
					</AlertDialog.Description>
					<Flex gap="3" mt="3">
						<AlertDialog.Cancel>
							<Button variant="soft" color="gray">
								Cancel
							</Button>
						</AlertDialog.Cancel>
						<AlertDialog.Action>
							<Button color="red" onClick={deleteIssue}>
								Delete
							</Button>
						</AlertDialog.Action>
					</Flex>
				</AlertDialog.Content>
			</AlertDialog.Root>
			<AlertDialog.Root open={error}>
				<AlertDialog.Content>
					<AlertDialog.Title>Error</AlertDialog.Title>
					<AlertDialog.Description>
						The issue could not be deletes
					</AlertDialog.Description>
					<Button
						color="gray"
						variant="soft"
						mt="2"
						onClick={() => setError(!error)}
					>
						OK
					</Button>
				</AlertDialog.Content>
			</AlertDialog.Root>
		</>
	)
}

export default DeleteIssueButton
