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
		<Card className='p-4 justify-between'>
			<Image
				width={300}
				height={320}
				quality={100}
				src={imageUrl}
				alt={name}
			/>
			<CardContent>
				<CardHeader>
					<CardTitle>{name}</CardTitle>
					<CardDescription>{description}</CardDescription>
				</CardHeader>
				<CardFooter>
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
