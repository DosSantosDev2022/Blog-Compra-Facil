import { Poppins , Chakra_Petch } from "next/font/google";

export const poppins = Poppins({
	weight: ['200', '300', '400', '500', '600'],
	subsets: ['latin'],
})

export const chakra = Chakra_Petch({
  weight: ['300', '400' ,'600','700'],
  subsets: ['latin']
})