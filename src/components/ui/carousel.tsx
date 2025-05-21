'use client'
import React, { type ReactNode, useEffect, useRef } from 'react'
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'
import { twMerge } from 'tailwind-merge'
import useCarousel from '@/hooks/useCarousel'

interface CarouselProps {
	children: React.ReactNode
	className?: string
	autoPlay?: boolean
	autoPlayInterval?: number
}

const CarouselButton = ({
	direction,
	onClick,
}: {
	direction: 'prev' | 'next'
	onClick: () => void
}) => (
	<button
		type='button'
		onClick={onClick}
		aria-label={direction === 'prev' ? 'Previous Slide' : 'Next Slide'}
		className={twMerge(
			'absolute top-1/2 -translate-y-1/2 transform rounded-full p-2',
			'bg-transparent text-accent-foreground duration-300 hover:bg-primary-hover hover:text-accent focus:outline-none active:scale-95',
			direction === 'prev' ? 'left-2 sm:left-4' : 'right-2 sm:right-4',
		)}
	>
		{direction === 'prev' ? (
			<IoIosArrowBack size={26} />
		) : (
			<IoIosArrowForward size={26} />
		)}
	</button>
)

interface CarouselIndicatorsProps {
	itemsLength: number
	currentIndex: number
	goToSlide: (index: number) => void
}

const CarouselIndicators = ({
	currentIndex,
	itemsLength,
	goToSlide,
}: CarouselIndicatorsProps) => (
	<div className='absolute bottom-4 left-1/2 z-30 flex -translate-x-1/2 space-x-3 p-2 sm:p-0 rtl:space-x-reverse'>
		{Array.from({ length: itemsLength }).map((_, index) => (
			<button
				key={index}
				type='button'
				onClick={() => goToSlide(index)}
				aria-label={`Go to slide ${index + 1}`}
				className={twMerge(
					'h-1.5 w-1.5 rounded-full transition-all duration-300 sm:h-2 sm:w-2',
					index === currentIndex
						? 'scale-110 bg-primary'
						: 'bg-secondary hover:bg-primary-hover',
				)}
			/>
		))}
	</div>
)

const Carousel = ({
	children,
	className,
	autoPlay = false,
	autoPlayInterval = 5000,
}: CarouselProps) => {
	const {
		currentIndex,
		nextSlide,
		prevSlide,
		goToSlide,
		updateItemsLength,
	} = useCarousel(autoPlay, autoPlayInterval)

	const itemsRef = useRef<ReactNode[]>([])

	useEffect(() => {
		const childrenArray = React.Children.toArray(children)
		itemsRef.current = childrenArray
		updateItemsLength(childrenArray.length)
	}, [children, updateItemsLength])

	return (
		<div
			aria-label='carousel-root'
			className={twMerge(
				'relative h-56 w-full overflow-hidden sm:h-72 md:h-96',
				'flex items-center justify-center',
				className,
			)}
			aria-live='polite'
		>
			{/* Conteúdo do Carrossel */}
			<div
				aria-label='carousel-content'
				className='flex h-full transition-transform duration-700 ease-in-out'
				style={{
					transform: `translateX(-${currentIndex * 100}%)`,
				}}
			>
				{itemsRef.current.map((child, index) => (
					<div
						aria-label='carousel-image'
						key={index}
						className='flex h-full w-full flex-shrink-0 items-center justify-center'
					>
						{child}
					</div>
				))}
			</div>

			{/* Botões de navegação */}
			{/* 	<CarouselButton direction='prev' onClick={prevSlide} />
			<CarouselButton direction='next' onClick={nextSlide} /> */}

			{/* Indicadores */}
			<CarouselIndicators
				itemsLength={itemsRef.current.length}
				currentIndex={currentIndex}
				goToSlide={goToSlide}
			/>
		</div>
	)
}

export { Carousel }
