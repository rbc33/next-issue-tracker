import { Select } from '@radix-ui/themes'
import React from 'react'

const AssigneeSelect = () => {
	return (
		<Select.Root>
			<Select.Trigger placeholder="asign..." />
			<Select.Content>
				<Select.Group>
					<Select.Label>Suggestions</Select.Label>
					<Select.Item value="1">Ricardo</Select.Item>
					<Select.Item value="2">Tanja</Select.Item>
					<Select.Item value="3">Miguel</Select.Item>
				</Select.Group>
			</Select.Content>
		</Select.Root>
	)
}

export default AssigneeSelect
