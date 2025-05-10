interface SectionTitleProps {
	title: string
}

const SectionTitle = ({ title }: SectionTitleProps) => {
	return (
		<div className='flex items-center justify-between h-10  rounded-2xl bg-muted text-primary lg:px-12 px-6 py-8'>
			<h2 className='font-bold lg:text-2xl text-base truncate'>{title}</h2>
		</div>
	)
}

export { SectionTitle }
