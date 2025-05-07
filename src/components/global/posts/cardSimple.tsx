import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'
import Image from 'next/image'
import Link from 'next/link'

interface CardSimpleProps {
	id: string
	title: string
	alt: string
	coverImage: string
	slug: string
	createdAt: string
}

const CardSimple = ({
	id,
	alt,
	coverImage,
	title,
	slug,
	createdAt,
}: CardSimpleProps) => {
	return (
		<Card className='p-3' key={id}>
			<CardHeader className='relative h-48 mb-0'>
				<Image
					alt={alt}
					src={coverImage}
					fill
					className='object-cover rounded-md'
				/>
			</CardHeader>
			<CardContent className='p-4 space-y-2'>
				<CardTitle>{title}</CardTitle>
				<p className='text-sm text-muted-foreground'>
					{`Publicado em: ${format(createdAt, 'dd/MM/yyyy', { locale: ptBR })}`}
				</p>
				<Button sizes='sm' asChild>
					<Link href={`/article/${slug}`}>Ler mais</Link>
				</Button>
			</CardContent>
		</Card>
	)
}

export { CardSimple }
