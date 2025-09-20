'use client'

import { useEffect } from 'react'

interface AdBannerTypes {
	dataAdSlot: string
	dataAdFormat: string
	label?: string
}

export function AdBanner({ dataAdFormat, dataAdSlot, label }: AdBannerTypes) {
	useEffect(() => {
		if (typeof window !== 'undefined') {
			// biome-ignore lint/suspicious/noExplicitAny: <explanation>
			const adsbygoogle = (window as any).adsbygoogle || []
			if (adsbygoogle.push) {
				try {
					adsbygoogle.push({})
				} catch (error) {
					console.error('Erro ao carregar o AdSense:', error)
				}
			}
		}
	}, [])

	return (
		<div aria-label={label} className='p-1 mt-3 mb-2'>
			<p className='text-sm text-muted-foreground mb-2'>Anúncio</p>
			<ins
				className='adsbygoogle bg-transparent'
				style={{ display: 'block' }}
				data-ad-client='ca-pub-2827166560948178'
				data-ad-slot={dataAdSlot}
				data-ad-format={dataAdFormat}
				data-full-width-responsive='true'
			/>
		</div>
	)
}

