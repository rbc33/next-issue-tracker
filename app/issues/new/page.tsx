'use client'
import { Button, TextField } from '@radix-ui/themes'
import { useForm, Controller } from 'react-hook-form'
import 'easymde/dist/easymde.min.css'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import dynamic from 'next/dynamic'

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

	return (
		<form
			className="max-w-xl space-y-3"
			onSubmit={handleSubmit(async (data) => {
				try {
					await axios.post('/api/issues', data)
					router.push('/issues')
				} catch (error) {
					console.log('Failed to create issue', error)
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
	)
}

export default NewIssuePage
