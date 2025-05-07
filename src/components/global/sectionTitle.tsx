interface SectionTitleProps {
	title: string
}

const SectionTitle = ({ title }: SectionTitleProps) => {
	return (
		<div className='flex items-center justify-between h-10 rounded-2xl bg-primary text-primary-foreground px-12 py-8'>
			<h2 className='font-bold lg:text-2xl text-lg'>{title}</h2>
		</div>
	)
}

export { SectionTitle }
