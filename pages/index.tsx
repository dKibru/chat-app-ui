import Link from 'next/link'
import React, { useEffect, useState, useContext } from "react";
import { SlackUser, Channel, ChatMessage } from "../types";
import DropDownElement from "../components/dropdown";

const themes = {
    light: {
        clist: "text-indigo-900 bg-purple-200 flex-none p-4 hidden md:block",
        cinfo: "text-indigo-800 bg-purple-200 flex-none w-64 pb-6 hidden md:block"
    },
    dark: {
        clist: "bg-indigo-900 text-purple-200 flex-none p-4 hidden md:block",
        cinfo: "bg-indigo-800 text-purple-200 flex-none w-64 pb-6 hidden md:block animate-pings"
    }
};
  
const ThemeContext = React.createContext(null);



function AddChannelModal(props : {
  exit: Function
}) {
    return (
        <div className="modal h-screen w-full fixed left-0 top-0 flex justify-center items-center bg-black bg-opacity-50">
        <div className="p-5 bg-white space-y-5 shadow-xl">
        <div className="border-b px-4 py-2 flex justify-between items-center">
            <h3 className="font-semibold text-3xl">New Room</h3>
            <button onClick={() => props.exit()} className="text-black close-modal">✗</button>
          </div>
        <div>
          <div className="grid grid-cols-2 gap-5">
            <input type="text" className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500" placeholder="First Name" />
            <input type="text" className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500" placeholder="Last Name" />
            <input type="email" className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2" placeholder="Email" />
            <input type="tel" className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2" placeholder="Phone" />
            <textarea cols={10} rows={5} className="border border-gray-500 px-4 py-2 focus:outline-none focus:border-purple-500 col-span-2" placeholder="Write your message..." defaultValue={""} />
          </div>
          <button className="focus:outline-none mt-5 bg-purple-500 px-4 py-2 text-white font-bold w-full">Create</button>
        </div>
      </div>
      </div>
    ) 
}

const ChannelList = (props : {
    channels : Channel[],
}) => {
    const {style, setStyle, activeChannel, setActiveChannel, toggleDetailVisiblity, setDetailVisiblity, modal, setModal} = useContext(ThemeContext);

    return (
        <div className={style.clist}>
            {
                props.channels.map(a => {
                    
                        if(activeChannel.id == a.id){
                            return (
                                <div key={a.id} onClick={toggleDetailVisiblity} className="cursor-pointer mb-4">
                                    <div className="bg-white h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
                                        <img src="https://twitter.com/tailwindcss/profile_image" alt="" />
                                    </div>
                                    <div className="text-center text-white opacity-50 text-sm">{a.name}</div>
                                </div>
                            )
                        }else {
                            return (
                                <div key={a.id} onClick={()=> {setActiveChannel(a);  setDetailVisiblity(true);}} className="cursor-pointer mb-4">
                                    <div className="bg-white opacity-25 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
                                        <svg className="fill-current h-10 w-10 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z" /></svg>
                                    </div>
                                    <div className="text-center text-white opacity-50 text-sm">{a.name}</div>
                                </div>
                            )
                        }
                })
            }
            <div onClick={()=>setModal(<AddChannelModal exit={() => setModal(<></>)} />)} className="cursor-pointer">
                <div className="bg-white opacity-25 h-12 w-12 flex items-center justify-center text-black text-2xl font-semibold rounded-lg mb-1 overflow-hidden">
                    <svg className="fill-current h-10 w-10 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z"/></svg>
                </div>
            </div>

            
        </div>
    )
}

const SingleChatMessage  = (props: ChatMessage) => {

    const {me} = useContext(ThemeContext);
    let cn = "flex items-start mb-4 text-sm "
    if (me.id == props.user.id)
        cn = cn + "bg-red-100"
    return (
         <div className={cn}>
            <img src={props.user.pic} className="w-10 h-10 rounded mr-3" />
            <div className="flex-1 overflow-hidden">
                <div>
                    <span className="font-bold">{props.user.name} </span>
                    <span className="text-gray-400 text-xs"> {props.sent_at}</span>
                </div>
                <p className="text-black leading-normal">{props.body}</p>
            </div>
        </div>
    )
}

const ChannelInfo = () => {

    const {style, setStyle, toggleStyle, activeChannel} = useContext(ThemeContext);
    return (
        <div className={style.cinfo} >
                <div className="text-white mb-2 mt-3 px-4 flex justify-between">
                    <div className="flex-auto">
                        <h1 className="font-semibold text-xl leading-tight mb-1 truncate">{activeChannel.name}</h1>
                        <div className="flex items-center mb-6">
                            <svg className="h-2 w-2 fill-current text-green mr-2" viewBox="0 0 20 20"><circle cx={10} cy={10} r={10} /></svg>
                            <span className="text-white opacity-50 text-sm">Adam Wathan</span>
                        </div>
                    </div>
                    <div>
                        
                        <svg onClick={toggleStyle} className="h-6 w-6 fill-current text-white opacity-25" viewBox="0 0 20 20">
                            <path d="M14 8a4 4 0 1 0-8 0v7h8V8zM8.027 2.332A6.003 6.003 0 0 0 4 8v6l-3 2v1h18v-1l-3-2V8a6.003 6.003 0 0 0-4.027-5.668 2 2 0 1 0-3.945 0zM12 18a2 2 0 1 1-4 0h4z" fillRule="evenodd" />
                        </svg>
                    </div>
                </div>
                <div className="mb-8">
                    <div className="px-4 mb-2 text-white flex justify-between items-center">
                        <div className="opacity-75">Channels</div>
                        <div>
                            <svg className="fill-current h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                            </svg>
                        </div>
                    </div>
                    <div className="bg-green-600 py-1 px-4 text-white"># general</div>
                </div>
                <div className="mb-8">
                    <div className="px-4 mb-2 text-white flex justify-between items-center">
                        <div className="opacity-75">Direct Messages</div>
                        <div>
                            <svg className="fill-current h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                            </svg>
                        </div>
                    </div>
                    <div className="flex items-center mb-3 px-4">
                        <svg className="h-2 w-2 fill-current text-green mr-2" viewBox="0 0 20 20"><circle cx={10} cy={10} r={10} /></svg>
                        <span className="text-white opacity-75">Adam Wathan <span className="text-grey text-sm">(you)</span></span>
                    </div>
                    <div className="flex items-center mb-3 px-4">
                        <svg className="h-2 w-2 fill-current text-green mr-2" viewBox="0 0 20 20"><circle cx={10} cy={10} r={10} /></svg>
                        <span className="text-white opacity-75">David Hemphill</span>
                    </div>
                    <div className="flex items-center px-4 mb-6 opacity-50">
                        <svg className="h-2 w-2 stroke-current text-white mr-2" viewBox="0 0 22 22"><circle cx={11} cy={11} r={9} fill="none" strokeWidth={3} /></svg>
                        <span className="text-white">Steve Schoger</span>
                    </div>
                </div>
                <div>
                    <div className="px-4 mb-2 text-white flex justify-between items-center">
                        <div className="opacity-75">Apps</div>
                        <div>
                            <svg className="fill-current h-4 w-4 opacity-50" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                <path d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 1 1 0-20 10 10 0 0 1 0 20zm0-2a8 8 0 1 0 0-16 8 8 0 0 0 0 16z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>
            
    )
}



















const initChatA : ChatMessage[] = [
    { id:"01", body: "Hello", user: { id: "001", name : "Bekele Kelele", pic: "https://avatars.dicebear.com/api/human/de.svg" }, sent_at: "56:65" },
    { id:"02", body: "Hi", user: { id: "002",name : "Ayele Kebede", pic: "https://avatars.dicebear.com/api/human/dde.svg" }, sent_at: "56:65" },
    { id:"03", body: "Hey", user: { id: "003",name : "Amanuel AMM", pic: "https://avatars.dicebear.com/api/human/dhe.svg" }, sent_at: "56:65" },
    { id:"04", body: "Hehe", user: { id: "002", name : "Ayele Kebede", pic: "https://avatars.dicebear.com/api/human/dde.svg" }, sent_at: "56:65" },
]
const initChatB : ChatMessage[] = [
    { id:"01", body: "Mersi", user: { id: "001", name : "Bekele Kelele", pic: "https://avatars.dicebear.com/api/human/dje.svg" }, sent_at: "56:65" },
    { id:"02", body: "Xue", user: { id: "002",name : "Ayele Kebede", pic: "https://avatars.dicebear.com/api/human/dse.svg" }, sent_at: "56:65" },
    { id:"03", body: "Vue", user: { id: "003",name : "Amanuel AMM", pic: "https://avatars.dicebear.com/api/human/dge.svg" }, sent_at: "56:65" },
    { id:"04", body: "HIHU", user: { id: "002", name : "Ayele Kebede", pic: "https://avatars.dicebear.com/api/human/dse.svg" }, sent_at: "56:65" },
]


const ChatBoxUI  = () => {

    const channels : Channel[] = [
        { img: "", name: "Room A", slug: "/slack/1", id : "A", messages: initChatA },
        { img: "", name: "Room B", slug: "/slack/2", id: "B", messages: initChatB },
        { img: "", name: "Room C", slug: "/slack/3", id : "C", messages: [] },
    ]
    const [me, setMe] = useState({ id: "002",name : "Ayele Kebede", pic: "https://avatars.dicebear.com/api/human/dse.svg" })
    const [style, setStyle] = useState(themes.dark);
    const [detailVisible, setDetailVisiblity] = useState(true);
    function toggleDetailVisiblity() {
        setDetailVisiblity(detailVisible => (!detailVisible));
    }
    const [activeChannel, setActiveChannel] = useState({ img: "", name: "Room B", slug: "/slack/2", id: "B", messages: initChatB });


    // const [modal, setModal] = useState(<AddChannelModal exit={() => setModal(<></>)}  />);
    const [modal, setModal] = useState(<></>);

    function toggleStyle() {
        setStyle(style => (style === themes.dark ? themes.light : themes.dark));
    }
    
    return (

        <ThemeContext.Provider value={{ 
            style, setStyle, toggleStyle, activeChannel, setActiveChannel ,
            detailVisible, setDetailVisiblity, toggleDetailVisiblity,
            me,
            modal, setModal
        }}>
        <div className="font-sans antialiased h-screen flex">
            <ChannelList channels={channels} />
            
            {detailVisible ? <ChannelInfo /> : <></>}
            {/* Chat content */}
            <div className="flex-1 flex flex-col bg-white overflow-hidden">
                {/* Top bar */}
                <div className="border-b flex px-6 py-2 items-center flex-none">
                    <div className="flex flex-col">
                        <h3 className="text-grey-darkest mb-1 font-extrabold">#general</h3>
                        <div className="text-grey-dark text-sm truncate">
                            Chit-chattin' about ugly HTML and mixing of concernss
                        </div>
                    </div>
                    <div className="ml-auto hidden md:block">
                        <div className="relative">
                            {/* <input type="search" placeholder="Search" className="appearance-none border border-grey rounded-lg pl-8 pr-4 py-2" />
                            <div className="absolute pin-y pin-l pl-3 flex items-center justify-center">
                                <svg className="fill-current text-grey h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                    <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
                                </svg>
                            </div> */}
                        </div>
                    </div>
                </div>
                {/* Chat messages */}
                <div className="px-6 py-4 flex-1 overflow-y-scroll">
                    {
                        activeChannel.messages.map(m => {
                            return (
                                <SingleChatMessage key={m.id} id={m.id} body={m.body} user={m.user} sent_at={m.sent_at} seen_at={m.seen_at} />
                            )
                        })
                    }
                </div>
                <div className="pb-6 px-4 flex-none">
                    <div className="flex rounded-lg border-2 border-gray-600 overflow-hidden">
                        <span className="text-3xl text-grey border-r-2 border-grey p-2 cursor-pointer	">
                            <svg className="fill-current h-6 w-6 block" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M16 10c0 .553-.048 1-.601 1H11v4.399c0 .552-.447.601-1 .601-.553 0-1-.049-1-.601V11H4.601C4.049 11 4 10.553 4 10c0-.553.049-1 .601-1H9V4.601C9 4.048 9.447 4 10 4c.553 0 1 .048 1 .601V9h4.399c.553 0 .601.447.601 1z" /></svg>
                        </span>
                        <input type="text" className="w-full px-4" placeholder="Message #general" />
                    </div>
                </div>
            </div>
            {modal}        
        </div>
        </ThemeContext.Provider>
    
    );
}

export default ChatBoxUI