import { useEffect, useState } from 'react'

function useCarousel(autoPlay: boolean, autoPlayInterval: number) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsLength, setItemsLength] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % itemsLength)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + itemsLength) % itemsLength)
  }

  const goToSlide = (index: number) => {
    if (index >= 0 && index < itemsLength) {
      setCurrentIndex(index)
    }
  }

  // Lógica de autoplay
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    if (autoPlay  && itemsLength > 0) {
      const interval = setInterval(nextSlide, autoPlayInterval)
      return () => clearInterval(interval)
    }
  }, [autoPlay, autoPlayInterval, itemsLength])

  // Lógica de navegação por teclado
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowLeft') prevSlide()
      if (event.key === 'ArrowRight') nextSlide()
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  }, [prevSlide, nextSlide])

  const updateItemsLength = (length: number) => {
    setItemsLength(length)
  }

  return { currentIndex, nextSlide, prevSlide, goToSlide, updateItemsLength }
}

export default useCarousel