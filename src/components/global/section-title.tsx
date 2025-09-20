interface SectionTitleProps {
	title: string
}

const SectionTitle = ({ title }: SectionTitleProps) => {
	return (
		<div className='flex items-center justify-between h-8  rounded-2xl bg-muted text-primary dark:text-primary-foreground lg:px-8 px-6 py-6'>
			<h2 className='font-bold lg:text-2xl text-base truncate'>{title}</h2>
		</div>
	)
}

export { SectionTitle }
