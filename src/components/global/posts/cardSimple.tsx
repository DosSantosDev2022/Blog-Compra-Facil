import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui'
import {
	Avatar,
	AvatarContainer,
	AvatarLabel,
	AvatarName,
	AvatarWrapper,
} from '@/components/ui/avatar'
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
	authorName: string
	authorImage: string
}

const CardSimple = ({
	alt,
	coverImage,
	title,
	slug,
	createdAt,
	authorImage,
	authorName,
}: CardSimpleProps) => {
	return (
		<Card className='flex flex-col h-full overflow-hidden max-w-xl w-full'>
			<CardHeader className='p-0 relative h-48 w-full'>
				<Image
					src={coverImage || ''}
					alt={alt}
					fill
					className='object-cover rounded-t-xl'
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
					unoptimized
				/>
			</CardHeader>
			<CardContent className='flex-grow flex flex-col justify-between p-4 space-y-2'>
				<CardTitle className='line-clamp-2 mb-2'>{title}</CardTitle>
				<div className='flex flex-col items-center space-y-6 mt-2'>
					<AvatarContainer>
						<Avatar name={authorName} src={authorImage || ''} />
						<AvatarWrapper>
							<AvatarName>{authorName}</AvatarName>
							<AvatarLabel>{`Publicado em: ${format(createdAt, 'dd/MM/yyyy', { locale: ptBR })}`}</AvatarLabel>
						</AvatarWrapper>
					</AvatarContainer>
				</div>
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
