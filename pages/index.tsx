import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import React, { useEffect, useState } from "react";
import { Socket } from "socket.io-client";

// https://codepen.io/RalliPi/pen/orRyRQ

type ChatUser = {
  id : string;
  name : string;
}

type ChatMsg = {
  body : string;
  sender_id : string;
  seen_at ?: string;
}
const chatHistory : ChatMsg[] = [
  { body: "a for", sender_id: "1234", "seen_at" : "34/56/77" },
  { body: "apple", sender_id: "4321", "seen_at" : "34/56/77" },
  { body: "b for", sender_id: "1234", "seen_at" : "34/56/77" },
  { body: "ball", sender_id: "4321", "seen_at" : "34/56/77" },
  { body: "c for", sender_id: "1234", "seen_at" : "34/56/77" },
  { body: "cat. D for", sender_id: "4321", "seen_at" : "34/56/77" },
  { body: "???", sender_id: "1234" },
];

const ChatBox : JSX.Element = (props : {
  me : string,
  chatHistory : ChatMsg[]
}) => {
  
  
  return (
    <div>
      <span>Chat history</span>
      <ul className="w-full">
        {
          props.chatHistory.map(f => {
            if (f.sender_id == props.me){
              return (<span className="flex bg-indigo-200 w-full ">
                <div className="float-right">
                {f.body}
                </div>
                </span>
              )
            }else {
              return (<span className="flex bg-gray-200 float-left w-full">
                {f.body}
                <br/>
                </span>
              )
            }
            
          })
        }
      </ul>
    </div>
  )
}



const ChatBoxUI : JSX.Element = () => {
  
    return (
      <div>
        <div style={{overscrollBehavior: 'none'}}>
          <div className="fixed w-full bg-green-400 h-16 pt-2 text-white flex justify-between shadow-md" style={{top: '0px', overscrollBehavior: 'none'}}>
            {/* back button */}
            <a href="/chat">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-12 h-12 my-1 text-green-100 ml-2">
                <path className="text-green-100 fill-current" d="M9.41 11H17a1 1 0 0 1 0 2H9.41l2.3 2.3a1 1 0 1 1-1.42 1.4l-4-4a1 1 0 0 1 0-1.4l4-4a1 1 0 0 1 1.42 1.4L9.4 11z" />
              </svg>
            </a>
            <div className="my-3 text-green-100 font-bold text-lg tracking-wide">@rallipi</div>
            {/* 3 dots */}
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="icon-dots-vertical w-8 h-8 mt-2 mr-2">
              <path className="text-green-100 fill-current" fillRule="evenodd" d="M12 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4zm0 7a2 2 0 1 1 0-4 2 2 0 0 1 0 4z" />
            </svg>
          </div>
          <div className="mt-20 mb-16 container mx-auto">
            <div className="clearfix">
              <div className="bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg">this is a basic mobile chat layout, build with tailwind css</div>
            </div>
            <div className="clearfix">
              <div className="bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg clearfix">It will be used for a full tutorial about building a chat app with vue, tailwind and firebase.</div>
            </div>
            <div className="clearfix">
              <div className="bg-green-300 float-right w-3/4 mx-4 my-2 p-2 rounded-lg clearfix">check my twitter to see when it will be released.</div>
            </div>
            <div className="clearfix">
              <div className="bg-gray-300 w-3/4 mx-4 my-2 p-2 rounded-lg ">It will be used for a full tutorial about building a chat app with vue, tailwind and firebase.</div>
            </div>
          </div>
        </div>
        <div className="fixed w-full flex justify-between bg-green-100" style={{bottom: '0px'}}>
          <textarea className="flex-grow m-2 py-2 px-4 mr-1 rounded-full border border-gray-300 bg-gray-200 resize-none" rows={1} placeholder="Message..." style={{outline: 'none'}} defaultValue={""} />
          <button className="m-2" style={{outline: 'none'}}>
            <svg className="svg-inline--fa text-green-400 fa-paper-plane fa-w-16 w-12 h-12 py-2 mr-2" aria-hidden="true" focusable="false" data-prefix="fas" data-icon="paper-plane" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
              <path fill="currentColor" d="M476 3.2L12.5 270.6c-18.1 10.4-15.8 35.6 2.2 43.2L121 358.4l287.3-253.2c5.5-4.9 13.3 2.6 8.6 8.3L176 407v80.5c0 23.6 28.5 32.9 42.5 15.8L282 426l124.6 52.2c14.2 6 30.4-2.9 33-18.2l72-432C515 7.8 493.3-6.8 476 3.2z" />
            </svg>
          </button>
        </div>
      </div>
    )

}
    




const Home: NextPage = (props) => {
  // console.log(props.socket)
  const [userId, setUserId] = useState("1234");
  const [name, setName] = useState("");
  const [chatList, setChatList] = useState(chatHistory);

  useEffect(() => {
    // props.socket.on("serverSent", (arg) => {
    //   setName(arg); // world
    // });
  })


  function send(e : React.MouseEvent<HTMLButtonElement> ) {
    let t = chatList
    t.push({
      body: name,
      sender_id: userId,
    })
    setChatList(t)
    setName("")
    e.preventDefault();
    console.log(name);
    // props.socket.emit("clientSent", name);

    // let s = props.socket as Socket<any, any>
    // props.socket.emit()
  }

  return (
    <ChatBoxUI />
  )

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          INSA CON
        </h1>
        <ChatBox me="1234" chatHistory={chatList} />

        <p className="width-full">
          <textarea className="border-black bg-gray-300" value={name} onChange={e => setName(e.target.value)}  rows={4}></textarea> 
          <br/>
          <button onClick={send} className="inline-flex text-white bg-indigo-500 border-0 py-2 px-6 focus:outline-none hover:bg-indigo-600 rounded text-lg">Send</button>
        </p>
        
      </main>

      <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          2021 &nbsp;
        </a>
      </footer>
    </div>
  )
}

export default Home
