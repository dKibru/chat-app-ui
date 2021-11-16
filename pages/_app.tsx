// import '../styles/tailwind.css'
import 'tailwindcss/tailwind.css'

import type { AppProps } from 'next/app'
 


function MyApp({ Component, pageProps }: AppProps) {
   

  let props = {
      ...pageProps
  };


  return <Component {...props} />
}

export default MyApp
