import React, {useEffect,useRef,useState} from 'react';
import {useSelector} from 'react-redux';
import "./LiveChatRoom.css"
import { io } from "socket.io-client"





let socket;

function LiveChatRoom({props}){
    console.log(props)

const user=useSelector((state)=>state.session.user)



const [connected,setConnected]=useState(false)
const [newMsg,setNewMsg]=useState('');
const [messages,setMessages]=useState([])
const [isLoaded,setIsLoaded]=useState(false);
const chatroom=props

const messageBox=useRef();



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
return()=>{
    socket.emit('leave',chatroom)
    socket.disconnect()
}
},[chatroom])

const handleConnect=async(e)=>{
const payload={
    user,
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
        user,
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
            user,
            message:newMsg
        }
        socket.emit("chat",payload)
    }
    setNewMsg("");
}


return(
<div className='room-chat-container'>
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




)


}
export default LiveChatRoom;





// import React, {useEffect,useRef,useState} from 'react';
// import {useSelector} from 'react-redux';
// import "./splash.css"
// import { io } from "socket.io-client"



// let socket;

// function Splash(){
// const user=useSelector((state)=>state.session.user)
// const [connected,setConnected]=useState(false)
// const [newMsg,setNewMsg]=useState('');
// const [messages,setMessages]=useState([])
// const chatroom="123"

// const messageBox=useRef();
// useEffect(()=>{
//     if(connected && messageBox){
//         console.log(messageBox)
//         messageBox.current.scrollIntoView({
//             behavior:"smooth",
//             block:"end",
//             inline:"nearest"
//         })
//     }
// },[messages])
// //creation of socket and start listeners
// useEffect(()=>{
//     // if(env==='production'){socket=io(renderdatabase)}

// socket=io()
// // socket=io("ws://localhost:8000")
// socket.on("chat",(data)=>{
//     setMessages(prev=>[...prev,data])
//     let chatbox=document.querySelector(".message-box")
//     chatbox.scrollIntoView({behavior:"smooth"})
// })
// return()=>{
//     socket.emit('leave',chatroom)
//     socket.disconnect()
// }
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
// <button>Disconnect</button>
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
// export default Splash;
