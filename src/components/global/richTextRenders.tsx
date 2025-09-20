import type { ReactNode } from 'react';
import { twMerge } from 'tailwind-merge'; // Importado para uma melhor gestão de classes

interface defaultRendersProps {
	children: ReactNode
}

interface defaultRendersLinkProps {
	href?: string
	children: ReactNode
}

interface ImageRenderProps {
	src?: string
	altText?: string
	width?: number
	height?: number
}

/**
 * @description Conjunto de renderers personalizados para o RichText.
 * @param children - Conteúdo do elemento a ser renderizado.
 */
const defaultRenders = {
	h1: ({ children }: defaultRendersProps) => (
		<h1 className="text-foreground font-bold text-4xl leading-tight my-8 md:text-5xl">
			{children}
		</h1>
	),
	h2: ({ children }: defaultRendersProps) => (
		<h2 className="text-foreground font-bold text-3xl leading-snug my-6 md:text-4xl">
			{children}
		</h2>
	),
	h3: ({ children }: defaultRendersProps) => (
		<h3 className="text-foreground font-bold text-2xl leading-relaxed my-4 md:text-3xl">
			{children}
		</h3>
	),
	h4: ({ children }: defaultRendersProps) => (
		<h4 className="text-foreground font-bold text-xl leading-relaxed my-3 md:text-2xl">
			{children}
		</h4>
	),
	bold: ({ children }: defaultRendersProps) => (
		<b className="font-semibold text-foreground">
			{children}
		</b>
	),
	p: ({ children }: defaultRendersProps) => (
		<p className="font-light text-base leading-relaxed lg:text-lg my-4">
			{children}
		</p>
	),
	a: ({ children, href }: defaultRendersLinkProps) => (
		<a
			href={href}
			className="text-accent-foreground hover:underline transition-colors duration-200"
		>
			{children}
		</a>
	),
	code_block: ({ children }: defaultRendersProps) => (
		<pre
			className={twMerge(
				'bg-slate-900 text-slate-200 p-4 rounded-lg overflow-x-auto w-full custom-scrollbar',
				'font-mono text-sm leading-relaxed my-6',
			)}
		>
			<code>{children}</code>
		</pre>
	),
	ul: ({ children }: defaultRendersProps) => (
		<ul className="list-disc list-inside space-y-2 pl-4">{children}</ul>
	),
	li: ({ children }: defaultRendersProps) => (
		<li className="text-base text-foreground font-light leading-relaxed">
			{children}
		</li>
	),
	img: ({ src, altText, width, height }: ImageRenderProps) => (
		<div className="my-8 flex justify-center">
			<img
				src={src}
				alt={altText ?? ''}
				width={width}
				height={height}
				className="rounded-xl shadow-lg w-full max-w-full object-contain"
			/>
		</div>
	),
}

export { defaultRenders };

