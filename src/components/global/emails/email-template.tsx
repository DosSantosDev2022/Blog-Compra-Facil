interface EmailTemplateProps {
	firstName: string
}

const EmailTemplate = ({ firstName }: EmailTemplateProps) => {
	return (
		<div className='rounded-md bg-slate-50 border w-full p-4 flex flex-col items-center justify-center gap-6'>
			<h1>Olá, meu nome é {firstName}!</h1>
		</div>
	)
}

export { EmailTemplate }
