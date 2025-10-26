'use client'
// import { Pencil2Icon } from '@radix-ui/react-icons'
import { AlertDialog, Button, Flex } from '@radix-ui/themes'

const DeleteIssueButton = ({ issueId }: { issueId: number }) => {
	return (
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
						<Button color="red">Delete</Button>
					</AlertDialog.Action>
				</Flex>
			</AlertDialog.Content>
		</AlertDialog.Root>
	)
}

export default DeleteIssueButton
