'use client'
import { Button, Callout, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import 'easymde/dist/easymde.min.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
// import dynamic from 'next/dynamic'
import { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { createIssueSchema } from '@/app/validationSchemas'
import SimpleMDE from 'react-simplemde-editor'
import { z } from 'zod'
import { ErrorMessage, Spinner } from '@/app/components'
import { Issue } from '@prisma/client'

// const SimpleMDE = dynamic(() => import('react-simplemde-editor'), {
// 	ssr: false,
// })

type IssueFormData = z.infer<typeof createIssueSchema>

const IssueForm = ({ issue }: { issue?: Issue }) => {
	const router = useRouter()
	const {
		register,
		control,
		handleSubmit,
		formState: { errors },
	} = useForm<IssueFormData>({
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
					defaultValue={issue?.title}
					variant="surface"
					placeholder="Title"
					{...register('title')}
				/>
				<ErrorMessage>{errors.title?.message}</ErrorMessage>{' '}
				<Controller
					defaultValue={issue?.description}
					name="description"
					control={control}
					render={({ field }) => <SimpleMDE {...field} />}
				/>
				<ErrorMessage>{errors.description?.message}</ErrorMessage>
				<br />
				<Button disabled={isSubmiting}>
					{issue ? 'Edit Issue' : 'Submit New Issue'}
					{isSubmiting && <Spinner />}
				</Button>
			</form>
		</div>
	)
}

export default IssueForm
