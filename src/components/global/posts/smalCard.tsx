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

interface SmallCardProps {
	title?: string
	subtitle?: string
	slug?: string
	createdAd?: string
	coverImage?: string
	description?: string
}

const SmallCard = ({ description, slug, title }: SmallCardProps) => {
	return (
		<Card className='lg:max-w-full lg:w-full'>
			<CardContent className='pt-6 space-y-3'>
				<CardHeader className='p-0'>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardDescription className='line-clamp-3'>
					{description}
				</CardDescription>
				<CardFooter className='p-0'>
					<Button variants='shine' asChild>
						<Link
							href={{
								pathname: `/article/${slug}`,
							}}
						>
							Ler mais...
						</Link>
					</Button>
				</CardFooter>
			</CardContent>
		</Card>
	)
}

export { SmallCard }
