import React, { useEffect, useState,useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect, useLocation, useHistory,NavLink } from "react-router-dom";
import { io } from "socket.io-client"

import "./UsersLiveChat.css"
import {getUsersThunk} from "../../store/users";
import onlineUser from "../logos/online.png";
import offlineUser from "../logos/offline.png";
let socket;

const UsersLiveChat =()=>{

    const dispatch=useDispatch();
    const history=useHistory();
    const [isLoaded,setIsLoaded]=useState(false);

    const [connected,setConnected]=useState(false)
    const [newMsg,setNewMsg]=useState('');
    const [messages,setMessages]=useState([])
    const chatroom=123;
    const messageBox=useRef();

    const sessionUser = useSelector((state) => state.session.user);
    const users=useSelector((state)=>state.users)
    const allUsers=Object.values(users).filter(user=>user?.id!==sessionUser?.id)
    const onlineUsers=allUsers.filter(user=>user.is_online==true)
    const offlineUsers=allUsers.filter(user=>user.is_online==false)

    useEffect(() => {

        const getData=async()=>{

            await dispatch(getUsersThunk())
            setIsLoaded(true);

        }
        getData();
    },[isLoaded])
    useEffect(()=>{
        if(connected && messageBox){
            console.log(messageBox)
            messageBox.current.scrollIntoView({
                behavior:"smooth",
                block:"end",
                inline:"nearest"
            })
        }
    },[messages])
    //creation of socket and start listeners
useEffect(()=>{
    // if(env==='production'){socket=io(renderdatabase)}

socket=io()
// socket=io("ws://localhost:8000")
socket.on("chat",(data)=>{
    setMessages(prev=>[...prev,data])


})
// socket.emit("notification",payload)
return()=>{
    socket.emit('leave',chatroom)
    socket.disconnect()
}
},[chatroom])

const handleConnect=async(e)=>{
    const payload={
        sessionUser,
        room:chatroom
    }
    socket.emit('join',payload);
    socket.on('join',async(data)=>{
        setMessages((prev)=>[...prev,data])
    });
    setConnected(true)
    }

    const handleDisconnect=async(e)=>{
        const payload={
            sessionUser,
            room:chatroom
        }
        socket.emit('leave',payload);
        socket.on('leave',async(data)=>{
            setMessages((prev)=>[...prev,data])

        })
        setConnected(false)
    }
    const sendChat=async(e)=>{
        e.preventDefault()
        if(newMsg){
            const payload={
                room:chatroom,
                sessionUser,
                message:newMsg
            }
            socket.emit("chat",payload)
        }
        setNewMsg("");
    }
    if(!sessionUser){return <Redirect to="/" />}

function getRandomInt(min,max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }


    return(<>
             <div className="users-on-usersLiveChat">
                <p>Users</p>
                <ul>{onlineUsers.map(user=>(
                    <li>{user.first_name} {user.last_name} <img src={onlineUser} id="online-offline-user-circle" /><NavLink exact to="/live-chat"
                     >LIVE CHAT</NavLink> </li>

))}

                </ul>
                <ul>{offlineUsers.map(user=>(
                    <li>{user.first_name} {user.last_name} <img src={offlineUser} id="online-offline-user-circle" /> </li>

))}

                </ul>





             </div>
             <div className="live-chat-on-users-live-chat">
             <h1>Messenger</h1>
<div className='controls'>
<button onClick={handleConnect}>Connect</button>
<button onClick={handleDisconnect}>Disconnect</button>
</div>
<div className='message-box' style={{height:"200px",width:"300px"}}>
    {connected ? messages.map((message,idx)=>(
        <div ref={messageBox} className='message-container'key={`${idx}-${new Date().getTime()}`}>
            <p>{message.msg}</p>
            <p>{message.user}</p>

        </div>
    )) : <h2>Not connected</h2>}
</div>
<div>
    <input placeholder='start chatting' value={newMsg} onChange={(e)=>setNewMsg(e.target.value)}/>
    <button onClick={sendChat}>send</button>
</div>
             </div>







   </>)
}

export default UsersLiveChat;
