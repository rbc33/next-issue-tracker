'use client'
import { Button, Callout, TextField, Text } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import 'easymde/dist/easymde.min.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchemas'
import { z } from 'zod'
import ErrorMessage from '@/app/components/ErrorMessage'
import Spinner from '@/app/components/Spinner'

const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
	ssr: false,
	loading: () => <p>Loading Editor...</p>,
})

type IssueForm = z.infer<typeof createIssueSchema>

const NewIssuePage = () => {
	const router = useRouter()
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueForm>({
		resolver: zodResolver(createIssueSchema),
	})
	const [error, setError] = useState('')
	const [isSubmiting, setSubmiting] = useState(false)

	const onSubmit = handleSubmit(async (data) => {
		try {
			setSubmiting(true)
			await axios.post('/api/issues', data)
			router.push('/issues')
		} catch (error) {
			setSubmiting(false)
			setError('An error occurred')
		}
	})

	return (
		<div className="max-w-xl">
			{error && (
				<Callout.Root className="mb-5">
					<Callout.Text>{error}</Callout.Text>
				</Callout.Root>
			)}
			<form className="space-y-3" onSubmit={onSubmit}>
				<TextField.Root
					variant="surface"
					placeholder="Title"
					{...register('title')}
				/>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>{' '}
				<Controller
					name="description"
					control={control}
					render={({ field }) => <SimpleMDE {...field} />}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<br />
				<Button disabled={isSubmiting}>
					Submit New Issue {isSubmiting && <Spinner />}
				</Button>
			</form>
		</div>
	)
}

export default NewIssuePage
