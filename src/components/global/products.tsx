import React from 'react'
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '../ui'
import Link from 'next/link'
import Image from 'next/image'

interface ProductCardProps {
	name: string
	imageUrl: string
	description: string
	LinkUrl: string
}

const ProductCard = ({
	name,
	imageUrl,
	description,
	LinkUrl,
}: ProductCardProps) => {
	return (
		<Card className='lg:w-xs w-full max-w-xl p-4 flex flex-col justify-between'>
			<Image
				width={300}
				height={320}
				quality={100}
				src={imageUrl}
				alt={name}
			/>
			<CardContent className='p-4 space-y-2'>
				<CardHeader className='p-0'>
					<CardTitle>{name}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardFooter className='p-0'>
					<Button variants='shine' sizes='full' asChild>
						<Link target='_blank' href={LinkUrl}>
							Ver mais
						</Link>
					</Button>
				</CardFooter>
			</CardContent>
		</Card>
	)
}

export { ProductCard }
