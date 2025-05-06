import type { ReactNode } from 'react'

interface defaultRendersProps {
	children: ReactNode
}
const defaultRenders = {
	h1: ({ children }: defaultRendersProps) => (
		<h1 className='text-accent font-bold text-4xl'>{children}</h1>
	),
	h2: ({ children }: defaultRendersProps) => (
		<h2 className='text-accent font-bold text-2xl'>{children}</h2>
	),
	h3: ({ children }: defaultRendersProps) => (
		<h3 className='text-accent font-bold text-xl'>{children}</h3>
	),
	h4: ({ children }: defaultRendersProps) => (
		<h4 className='text-accent font-bold text-lg'>{children}</h4>
	),
	bold: ({ children }: defaultRendersProps) => (
		<b className='text-accent font-bold'>{children} </b>
	),
	p: ({ children }: defaultRendersProps) => (
		<p className='font-light mt-4'>{children}</p>
	),
	code_block: ({ children }: defaultRendersProps) => (
		<pre className='bg-primary text-muted p-4 rounded-md overflow-x-auto w-full custom-scrollbar'>
			<code>{children}</code>
		</pre>
	),
	ul: ({ children }: defaultRendersProps) => (
		<ul className=' p-2'>{children}</ul>
	),
	li: ({ children }: defaultRendersProps) => (
		<li className='mb-2 text-start font-light text-muted-foreground'>
			{children}
		</li>
	),
}

export { defaultRenders }
