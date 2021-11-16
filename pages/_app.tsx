// import '../styles/tailwind.css'
import 'tailwindcss/tailwind.css'

import type { AppProps } from 'next/app'

// import { io } from "socket.io-client";


function MyApp({ Component, pageProps }: AppProps) {
  
  // // const socket = io("http://localhost:3001");
  // const socket = io('http://localhost:3001' , {transports: ['websocket']});

  // socket.on("connect", () => {
  //   console.log(socket.id); // x8WIv7-mJelg7on_ALbx
  // });
  
  // socket.on("disconnect", () => {
  //   console.log(socket.id); // undefined
  // });

  // let s = {
  //   socket : socket
  // }

  let props = {
      ...pageProps,
      // ...s
  };


  return <Component {...props} />
}

export default MyApp
