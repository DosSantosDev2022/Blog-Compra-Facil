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
		<Card className='flex flex-col h-full overflow-hidden max-w-xl lg:w-sm w-full'>
			<CardHeader className='p-0 relative h-48 w-full'>
				<Image
					src={coverImage}
					alt={alt}
					fill
					className='object-cover rounded-t-xl'
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				/>
			</CardHeader>
			<CardContent className='flex-grow flex flex-col justify-between p-4 space-y-2'>
				<CardTitle className='line-clamp-2 mb-2'>{title}</CardTitle>
				<p className='text-sm text-muted-foreground mt-auto'>
					{`Publicado em: ${format(createdAt, 'dd/MM/yyyy', { locale: ptBR })}`}
				</p>
			</CardContent>
			<CardFooter className='p-4 pt-0'>
				<Button variants='primary' sizes='sm' asChild className='w-full'>
					<Link href={`/article/${slug}`}>Ler mais</Link>
				</Button>
			</CardFooter>
		</Card>
	)
}

export { CardSimple }
