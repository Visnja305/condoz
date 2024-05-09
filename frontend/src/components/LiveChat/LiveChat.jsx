import { useEffect, useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getUserByProfileIdThunk } from "../../store/users";
import { io } from "socket.io-client";
import "./LiveChat.css";
/* eslint-disable react/prop-types */

let socket;

function LiveChat({ props }) {
  console.log(props);
//   const theArr=props.handleInvitedChatsArr
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  const [connected, setConnected] = useState(false);
  const [newMsg, setNewMsg] = useState("");
  const [messages, setMessages] = useState([]);
  const [invitedUserOrInitiator, setInvitedUserOrInitiator] = useState("");

  const chatroom = props.room;

  const messageBox = useRef();
  useEffect(() => {
    if (props.invited) {
      const getData = async () => {
        dispatch(getUserByProfileIdThunk(props.initiatorProfileId)).then(
          (res) => setInvitedUserOrInitiator(res)
        );
      };
      getData();
    }
    if (!props.invited) {
      const getData = async () => {
        dispatch(getUserByProfileIdThunk(props.invitedUserProfileId)).then(
          (res) => setInvitedUserOrInitiator(res)
        );
      };

      getData();
    }
  }, []);
  console.log(invitedUserOrInitiator);
  useEffect(() => {
    if (connected && messageBox) {
      console.log(messageBox);
      messageBox.current.scrollIntoView({
        behavior: "smooth",
        block: "end",
        inline: "nearest",
      });
    }
  }, [messages]);

  //creation of socket and start listeners
  useEffect(() => {
    // if(env==='production'){socket=io(renderdatabase)}

//     if (process.env.NODE_ENV === 'production'){
//         socket=io("wss://condoz.onrender.com")
//     }
// else{
// socket=io()
// }
// socket=io(import.meta.env.PROD===true ? "https://condoz.onrender.com/socket.io" : "")
socket=io();
    // socket=io("ws://localhost:8000")
    socket.on("chat", (data) => {
      setMessages((prev) => [...prev, data]);
    });

    // return () => {
    //   socket.emit("leave", chatroom);
    //   socket.disconnect();
    // };
    return (() => {
      socket.disconnect()
  })
  }, [chatroom]);

  const handleConnect = async () => {
    console.log("trying to connect");
    const payload = {
      user,
      room: chatroom,
    };
    console.log(payload);
    socket.emit("join", payload);
    socket.on("join", async (data) => {
      setMessages((prev) => [...prev, data]);
    });
    setConnected(true);
  };

  const handleDisconnect = async (e) => {
    e.stopPropagation();
    console.log("handle disconnect 1")
    const payload = {
      user,
      room: chatroom,
    };
    socket.emit("leave", payload);
    socket.on("leave", async (data) => {
        console.log("socket leave 1")
      setMessages((prev) => [...prev, data]);
      console.log("socket leave 2")
    });
    setConnected(false);
    console.log("handle disonnect 2")
    if (props.invited) {
     props.handleInvitedChatsArr(props)}
    if (!props.invited) {
      props.handleInitiatedChatsArr(props)
    }

    console.log("handle disonnect 3")
  };
  const sendChat = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (newMsg) {
      const payload = {
        room: chatroom,
        user,
        message: newMsg,
      };
      socket.emit("chat", payload);
    }
    setNewMsg("");
  };
  return (
    <div className="splash-container">
      <h1>
        Chat with{" "}
        <span>
          {invitedUserOrInitiator.first_name} {invitedUserOrInitiator.last_name}
        </span>{" "}
        in chatroom number {<span>{chatroom}</span>}
      </h1>
      <div className="controls">
        <button onClick={(e)=>handleConnect(e)}>Connect</button>
        <button onClick={(e)=>handleDisconnect(e)}>Disconnect</button>
      </div>
      <div className="message-box" style={{ height: "200px", width: "300px" }}>
        {connected ? (
          messages.map((message, idx) => (
            <div
              ref={messageBox}
              className="message-container"
              key={`${message}-lc`}
            >
              <p>{message.msg}</p>
              <p>{message.user}</p>
            </div>
          ))
        ) : (
          <h2>Not connected</h2>
        )}
      </div>
      <div>
        <input
          placeholder="start chatting"
          value={newMsg}
          onChange={(e) => setNewMsg(e.target.value)}
        />
        <button onClick={sendChat}>send</button>
      </div>
    </div>
  );
}
export default LiveChat;

// import React, {useEffect,useRef,useState} from 'react';
// import {useSelector} from 'react-redux';
// import "./LiveChat.css"
// import { io } from "socket.io-client"
// import { useParams } from "react-router-dom";

// let socket;

// function LiveChat({props}){
// console.log(props)
// const chatroom=props.chatroom;
// const payload=props.payload;

// const user=useSelector((state)=>state.session.user)
// const [connected,setConnected]=useState(false)
// const [newMsg,setNewMsg]=useState('');
// const [messages,setMessages]=useState([])
// // const chatroom=123

// const messageBox=useRef();
// useEffect(()=>{
//         if(connected && messageBox){
//             console.log(messageBox)
//             messageBox.current.scrollIntoView({
//                 behavior:"smooth",
//                 block:"end",
//                 inline:"nearest"
//             })
//         }
//     },[messages])

// //creation of socket and start listeners
// useEffect(()=>{
//     // if(env==='production'){socket=io(renderdatabase)}

// socket=io()
// // socket=io("ws://localhost:8000")
// socket.on("chat",(data)=>{
//     setMessages(prev=>[...prev,data])

// })
// socket.emit("notification",payload)
// // return()=>{
// //     socket.emit('leave',chatroom)
// //     socket.disconnect()
// // }
// },[chatroom])

// const handleConnect=async(e)=>{
// const payload={
//     user,
//     room:chatroom
// }
// socket.emit('join',payload);
// socket.on('join',async(data)=>{
//     setMessages((prev)=>[...prev,data])
// });
// setConnected(true)

// }
// const handleDisconnect=async(e)=>{
//     const payload={
//         user,
//         room:chatroom
//     }
//     socket.emit('leave',payload);
//     socket.on('leave',async(data)=>{
//         setMessages((prev)=>[...prev,data])

//     })
//     setConnected(false)
// }
// const sendChat=async(e)=>{
//     e.preventDefault()
//     if(newMsg){
//         const payload={
//             room:chatroom,
//             user,
//             message:newMsg
//         }
//         socket.emit("chat",payload)
//     }
//     setNewMsg("");
// }
// return(
// <div className='splash-container'>
// <h1>Messenger</h1>
// <div className='controls'>
// <button onClick={handleConnect}>Connect</button>
// <button onClick={handleDisconnect}>Disconnect</button>
// </div>
// <div className='message-box' style={{height:"200px",width:"300px"}}>
//     {connected ? messages.map((message,idx)=>(
//         <div ref={messageBox} className='message-container'key={`${idx}-${new Date().getTime()}`}>
//             <p>{message.msg}</p>
//             <p>{message.user}</p>

//         </div>
//     )) : <h2>Not connected</h2>}
// </div>
// <div>
//     <input placeholder='start chatting' value={newMsg} onChange={(e)=>setNewMsg(e.target.value)}/>
//     <button onClick={sendChat}>send</button>
// </div>

// </div>

// )

// }
// export default LiveChat;

{
  /* <h1>Chat with {props.invited ? <span>{initiatorUserIfInvited.first_name} {initiatorUserIfInvited.last_name}</span> : <span>{invitedUserIfInviting.first_name} {invitedUserIfInviting.last_name}</span>} in chatroom number {<span>{chatroom}</span>}</h1> */
}

// if(props.invited){
//     const getProfile=async()=>{
//     await dispatch(getUserByProfileIdThunk(props.initiatorProfileId))}
//     const theUser=getProfile()
//     console.log(theUser)
//         }
//     if(!props.invited){
//     const getProfile=async()=>{
//     dispatch(getUserByProfileIdThunk(props.invitedUserProfileId)).then(res=>setInvitedUserOrInitiator(res.body))}
//     getProfile()
//             }

// useEffect(()=>{
//     if(props.invited){
//     const getProfile=async()=>{
//     await dispatch(getUserByProfileIdThunk(props.initiatorProfileId)).then(res=>console.log(res))}
//     const theUser=getProfile()
//     if (theUser){
//         console.log(theUser)}
//         }
//     if(!props.invited){
//     const getProfile=async()=>{
//     await dispatch(getUserByProfileIdThunk(props.invitedUserProfileId))}
//     const theUser=getProfile()
//     if (theUser){
//     console.log(theUser)}

//             }

// },[])
