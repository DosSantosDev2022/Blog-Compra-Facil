import React from 'react'
import { Button } from '../ui'
import Link from 'next/link'

interface ProductCardProps {
	name: string
	imageUrl: string
	description: string
	url: string
}

const ProductCard = ({
	name,
	imageUrl,
	description,
	url,
}: ProductCardProps) => {
	return (
		<div className='max-w-xs rounded overflow-hidden shadow-lg m-4 flex flex-col justify-between'>
			<img className='w-full' src={imageUrl} alt={name} />
			<div className='px-6 py-4'>
				<h6 className='font-bold text-xl mb-2'>{name}</h6>
				<p className='text-muted-foreground text-sm'>{description}</p>
			</div>
			<div className='px-6 py-4'>
				<Button variants='shine' sizes='full' asChild>
					<Link target='_blank' href={url}>
						Ver mais
					</Link>
				</Button>
			</div>
		</div>
	)
}

export { ProductCard }
