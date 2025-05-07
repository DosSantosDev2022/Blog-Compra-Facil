import Link from 'next/link'
import { Button } from '../ui'

interface SectionTitleProps {
	title: string
	path?: string
}

const SectionTitle = ({ path, title }: SectionTitleProps) => {
	return (
		<div className='flex items-center justify-between h-10 rounded-2xl bg-primary text-primary-foreground px-12 py-8'>
			<h2 className='font-bold lg:text-2xl text-lg'>{title}</h2>
			{path && (
				<Button variants='shine' asChild>
					<Link href={path || ''}>Ver mais</Link>
				</Button>
			)}
		</div>
	)
}

export { SectionTitle }
