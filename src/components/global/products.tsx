import Image from 'next/image'
import Link from 'next/link'
import {
	Button,
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardTitle
} from '../ui'

interface ProductCardProps {
	name: string
	imageUrl: string
	description: string
	affiliateLinks: {
		id: string
		name: string
		link: string
		icon: {
			url: string
		}
	}[]
}

const ProductCard = ({
	name,
	imageUrl,
	description,
	affiliateLinks
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
				<CardFooter className='p-0 flex-col'>
					<span className='text-xs text-muted-foreground my-2'>Compre em nossas lojas parceiras</span>
					{affiliateLinks.map((affiliateLink) => (
						<Button key={affiliateLink.id} variants='shine' sizes='full' asChild>
							<Link target='_blank' href={affiliateLink.link}>
								{`Comprar em ${affiliateLink.name}`}
							</Link>
						</Button>
					))}

				</CardFooter>
			</CardContent>
		</Card>
	)
}

export { ProductCard }

