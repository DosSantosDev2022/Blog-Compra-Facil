import {
	Button,
	Card,
	CardContent,
	CardDescription,
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
		<Card className='px-6 py-2'>
			<CardContent>
				<CardHeader>
					<CardTitle>{title}</CardTitle>
				</CardHeader>
				<CardDescription>{description}</CardDescription>
				<Button variants='shine' asChild>
					<Link
						href={{
							pathname: `/article/${slug}`,
						}}
					>
						Ver mais
					</Link>
				</Button>
			</CardContent>
		</Card>
	)
}

export { SmallCard }
