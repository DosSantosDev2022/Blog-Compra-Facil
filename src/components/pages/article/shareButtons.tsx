import { Button } from '@/components/ui'
import Link from 'next/link'

const ShareButtons = () => {
	return (
		<div className='flex gap-4'>
			<Button sizes='sm' asChild>
				<Link href='#'>Facebook</Link>
			</Button>
			<Button sizes='sm' asChild>
				<Link href='#'>Twitter</Link>
			</Button>
			<Button sizes='sm' asChild>
				<Link href='#'>LinkedIn</Link>
			</Button>
			{/* Adicione mais redes sociais */}
		</div>
	)
}

export { ShareButtons }
