import React, {useEffect,useState} from 'react';
import {useSelector,useDispatch} from 'react-redux';
import "./LiveChat.css"
import { useParams} from "react-router-dom";

import onlineUser from "../logos/online.png"
import offlineUser from "../logos/offline.png"
import {getUsersThunk} from "../../store/users";
import {getAllNotificationsThunk } from "../../store/notifications";
import {getCurrentUsersProfileThunk} from '../../store/userProfiles';
import {addChatNotificationThunk} from "../../store/notifications";
import LiveChatRoom from '../LiveChatRoom';





function LiveChat(){
    const param=useParams();
    const profileId=param.profileId
    const dispatch=useDispatch();


const users=useSelector((state)=>state.users)
const sessionUser = useSelector((state) => state.session.user);
const userNotifications= useSelector((state) => state.notifications[profileId]);

console.log(userNotifications)

    const allUsers=Object.values(users).filter(user=>user.id!==sessionUser.id)

    const onlineUsers=allUsers.filter(user=>user.is_online==true)
    const offlineUsers=allUsers.filter(user=>user.is_online==false)


const [isLoaded,setIsLoaded]=useState(false);
const [liveChats,setLiveChats]=useState([]);
const [liveChatRequests,setLiveChatRequests]=useState([]);
const [fromCurrentUser,setFromCurrentUser]=useState(false);
const [activeChatsWith,setActiveChatsWith]=useState([]);

let filtered
if(userNotifications){
filtered=Object.keys(userNotifications).filter(user=>!activeChatsWith.includes(user))}

// setLiveChatRequests(chatNotifications);
// console.log(liveChatRequests)
console.log(liveChats)

useEffect(() => {

    const getData=async()=>{


        await dispatch(getUsersThunk())
        await dispatch(getAllNotificationsThunk(profileId))
        // setLiveChatRequests(chatNotifications)
        setIsLoaded(true);

    }
    getData();
},[isLoaded])


// let arr
// useEffect(() => {

//     const getLiveChatRequests=async()=>{
//         arr=liveChat


//     }
//     getLiveChatRequests();
// },[liveChatRequests])

function getRandomInt(min,max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }

const handleGoToChat=async(e,id)=>{
    e.preventDefault();
    setFromCurrentUser(true)
    const room=getRandomInt(1,1000)
    setLiveChats(prev=>[...prev,room]);
    setActiveChatsWith(prev=>[...prev,id])
   await dispatch(addChatNotificationThunk(room,id));


}
return(<div className="chats-and-users-container">
    <div className="users-container">
    <p>Users</p>
                <ul>{onlineUsers.map(user=>(
                    <li>{user.first_name} {user.last_name} <img src={onlineUser} id="online-offline-user-circle" /> <button onClick={(e)=>handleGoToChat(e,user.profile_id)} disabled={fromCurrentUser} >Live chat</button></li>

))}

                </ul>
                <ul>{offlineUsers.map(user=>(
                    <li>{user.first_name} {user.last_name}<img src={offlineUser} id="online-offline-user-circle" /> </li>

))}

                </ul>
    </div>
<div className='chat-container'>
    {liveChats.length!==0 && liveChats.map((room,index)=><div>{
        liveChats.splice(index,1)
       }
        <LiveChatRoom props={Number(room)}/>
    </div>)}
    {filtered && filtered.map((user,index)=>



<div>


        <LiveChatRoom props={userNotifications.user}/>
    </div>)}


</div>

</div>


)


}
export default LiveChat;





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
