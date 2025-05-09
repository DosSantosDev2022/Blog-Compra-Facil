import React from 'react'
import { Button } from '../ui'
import Link from 'next/link'

interface ProductCardProps {
	name: string
	imageUrl: string
	description: string
}

const ProductCard = ({
	name,
	imageUrl,
	description,
}: ProductCardProps) => {
	return (
		<div className='max-w-xs rounded overflow-hidden shadow-lg m-4'>
			<img className='w-full' src={imageUrl} alt={name} />
			<div className='px-6 py-4'>
				<h6 className='font-bold text-xl mb-2'>{name}</h6>
				<p className='text-muted-foreground text-base'>{description}</p>
			</div>
			<div className='px-6 pt-2 pb-2'>
				<Button variants='shine' sizes='full' asChild>
					<Link href={''}>Ver mais</Link>
				</Button>
			</div>
		</div>
	)
}

export { ProductCard }
