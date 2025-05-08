'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { type SubmitHandler, useForm } from 'react-hook-form'
import { Button, Input } from '@/components/ui'
import { MdEmail } from 'react-icons/md'
import { z } from 'zod'

const regexEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/

const zodFormSchema = z.object({
	email: z.string().refine((value) => regexEmail.test(value), {
		message: 'Formato de email inválido',
	}),
})

type FormInput = z.infer<typeof zodFormSchema>

const NewsLetterForm = () => {
	const {
		register,
		handleSubmit,
		reset,
		formState: { errors },
	} = useForm<FormInput>({ resolver: zodResolver(zodFormSchema) })

	const onSubmit: SubmitHandler<FormInput> = async (data) => {
		const response = await fetch('/api/send', {
			method: 'POST',
			headers: {
				'Content-type': 'application/json',
			},
			body: JSON.stringify(data),
		})

		if (response.ok) {
			alert('Email cadastrado com sucesso')
		} else {
			alert('Erro ao cadastrar Email')
		}
		reset()
	}

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col gap-2 w-full'
		>
			<div className='flex flex-col gap-1 w-full'>
				<Input
					{...register('email')}
					type='email'
					id='send-email'
					required
					icon={<MdEmail />}
					placeholder='Digite o seu e-mail'
				/>
				{errors && (
					<span className='text-danger'>{errors.email?.message}</span>
				)}
			</div>

			<Button className='w-full  h-10 ' variants={'secondary'}>
				Inscrever
			</Button>
		</form>
	)
}

export { NewsLetterForm }
