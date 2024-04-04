import React, { useEffect, useState,useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import { useParams, Redirect, useLocation, useHistory,NavLink } from "react-router-dom";
import { io } from "socket.io-client"
import LiveChat from "../LiveChat"
import "./UsersLiveChat.css"
import {getUsersThunk} from "../../store/users";
import onlineUser from "../logos/online.png";
import offlineUser from "../logos/offline.png";
let socket;

const UsersLiveChat =()=>{

    const dispatch=useDispatch();
    const history=useHistory();
    const [isLoaded,setIsLoaded]=useState(false);

   
    const [chatRoomInitiated,setChatroomInitiated]=useState([]);
    const [chatRoomInvited,setChatRoomInvited]=useState([]);



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


    function getRandomInt(min,max) {
        const minCeiled = Math.ceil(min);
        const maxFloored = Math.floor(max);
        return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
      }
      const handleInvitedChatsArr = (data) => {
        setChatRoomInvited(data)
    }
    const handleInitiatedChatsArr = (data) => {
        setChatroomInitiated(data)
    }
    const handleBeginChat=(e,id)=>{
        e.preventDefault();
        const room=getRandomInt(1,1000);
        const payload={
                initiatorProfileId:sessionUser.profile_id,
                invitedUserProfileId:id,
                room:room,
                handleInvitedChatsArr:handleInvitedChatsArr,
                handleInitiatedChatsArr:handleInitiatedChatsArr


            }

        socket.emit("notification",payload)
        setChatroomInitiated((prev)=>[...prev,payload])


    }



    useEffect(() => {
        socket=io()
        socket.on("notification",async function(data){
            console.log(data.invitedUserProfileId===sessionUser?.profile_id && data.initiatorProfileId!==sessionUser?.profile_id)
            if(data.invitedUserProfileId===sessionUser?.profile_id && data.initiatorProfileId!==sessionUser?.profile_id){
                data.invited=true;

                setChatRoomInvited((prev)=>[...prev,data]);


            }

        })


    },[])
    // socket?.on("notification",async(data)=>{
    //     console.log(data)
    //     console.log(Number(data.invitedUserProfileId)===Number(sessionUser.profile_id) && Number(data.initiatorProfileId)!==Number(sessionUser.profile_id))
    //     if(data.invitedUserProfileId===sessionUser.profile_id && data.initiatorProfileId!==sessionUser.profile_id){
    //        await setChatRoomInvited((prev)=>[...prev,data.room]);


    //     }
    // //     // setNotification((prev)=>[...prev,data])
    // })

    if(!sessionUser){return <Redirect to="/" />}




    return(<>
             <div className="users-on-usersLiveChat">
                <p>Users</p>
                <ul>{onlineUsers.map(user=>(
                    <li>{user.first_name} {user.last_name} <img src={onlineUser} id="online-offline-user-circle" /><button onClick={(e)=>handleBeginChat(e,user.profile_id)}>Chat</button> </li>

))}

                </ul>
                <ul>{offlineUsers.map(user=>(
                    <li>{user.first_name} {user.last_name} <img src={offlineUser} id="online-offline-user-circle" /> </li>

))}

                </ul>





             </div>
             <div>
                <h1>Chats initiated</h1>
             {chatRoomInitiated && chatRoomInitiated.map(roomData=><LiveChat props={roomData} />)}
             </div>
             <div>
                <h1>Chats invited</h1>
                {chatRoomInvited && chatRoomInvited.map(roomData=><LiveChat props={roomData} />)}

             </div>







   </>)
}

export default UsersLiveChat;
