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
		<Card className='w-full max-w-xl p-4 flex flex-col justify-between'>
			<div className='relative w-full h-46 overflow-hidden rounded-md'>
				<Image
					src={imageUrl}
					alt={name}
					fill
					className='object-cover'
					sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
				/>
			</div>
			<CardContent className='p-0 space-y-2'>
				<CardTitle className='lg:text-base pt-2'>{name}</CardTitle>
				<CardDescription>{description}</CardDescription>
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
