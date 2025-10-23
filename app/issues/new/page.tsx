'use client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import 'easymde/dist/easymde.min.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useState } from 'react'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
	ssr: false,
	loading: () => <p>Loading Editor...</p>,
})

interface IssueForm {
	title: string
	description: string
}

const NewIssuePage = () => {
	const router = useRouter()
	const { register, control, handleSubmit } = useForm<IssueForm>()
	const [error, setError] = useState('')

	return (
		<div className="max-w-xl">
			{error && (
				<Callout.Root className="mb-5">
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form
				className="space-y-3"
				onSubmit={handleSubmit(async (data) => {
					try {
						await axios.post('/api/issues', data)
						router.push('/issues')
					} catch (error) {
						setError('An error occurred')
					}
				})}
			>
				<TextField.Root
					variant="surface"
					placeholder="Title"
					{...register('title')}
				/>
				<Controller
					name="description"
					control={control}
					render={({ field }) => <SimpleMDE {...field} />}
				/>
				<Button>Submit New Issue</Button>
			</form>
		</div>
	)
}

export default NewIssuePage
