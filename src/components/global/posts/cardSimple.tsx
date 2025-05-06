import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui'
import Link from 'next/link'

interface CardSimpleProps {
	id: string
	title: string
	excerpt: string
	slug: string
}

const CardSimple = ({ id, title, slug, excerpt }: CardSimpleProps) => {
	return (
		<Card
			key={id}
			className='bg-gray-100 rounded-md shadow-md overflow-hidden'
		>
			<CardHeader className='h-48 bg-zinc-300'>
				{/* Imagem de destaque do artigo (simulada) */}
			</CardHeader>
			<CardContent>
				<CardTitle>{title}</CardTitle>
				<CardDescription>{excerpt}</CardDescription>
			</CardContent>
			<CardFooter>
				<Button sizes='sm' asChild>
					<Link href={`/artigo/${slug}`}>Ler mais</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}

export { CardSimple }
