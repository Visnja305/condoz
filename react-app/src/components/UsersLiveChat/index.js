import React, { useEffect, useState, useRef } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  useParams,
  Redirect,
  useLocation,
  useHistory,
  NavLink,
} from "react-router-dom";
import { io } from "socket.io-client";
import LiveChat from "../LiveChat";
import "./UsersLiveChat.css";
import { getUsersThunk } from "../../store/users";
import onlineUser from "../logos/online.png";
import offlineUser from "../logos/offline.png";
let socket;

const UsersLiveChat = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [isLoaded, setIsLoaded] = useState(false);

  const [chatRoomInitiated, setChatRoomInitiated] = useState([]);
  const [chatRoomInvited, setChatRoomInvited] = useState([]);

  const sessionUser = useSelector((state) => state.session.user);
  const users = useSelector((state) => state.users);
  const allUsers = Object.values(users).filter(
    (user) => user?.id !== sessionUser?.id
  );
  const onlineUsers = allUsers.filter((user) => user.is_online == true);
  const offlineUsers = allUsers.filter((user) => user.is_online == false);

//   useEffect(()=>{
// const getData=async()=>{
//     await chatRoomInvited;
//     await chatRoomInitiated
// }
//   },[chatRoomInitiated,chatRoomInvited])
  useEffect(() => {
    const getData = async () => {
      await dispatch(getUsersThunk());
      setIsLoaded(true);
    };
    getData();
  }, [isLoaded]);
  useEffect(() => {
    console.log(chatRoomInitiated, chatRoomInvited);
  }, [chatRoomInitiated, chatRoomInvited]);

  function getRandomInt(min, max) {
    const minCeiled = Math.ceil(min);
    const maxFloored = Math.floor(max);
    return Math.floor(Math.random() * (maxFloored - minCeiled) + minCeiled); // The maximum is exclusive and the minimum is inclusive
  }
  const handleInvitedChatsArr = (props) => {
   return setChatRoomInvited(prev=>{
        const index =prev.indexOf(props);
        prev.splice(index, 1);
        return [...prev]})
  };
  const handleInitiatedChatsArr = (props) => {
    return setChatRoomInitiated(prev=>{
        const index =prev.indexOf(props);
        prev.splice(index, 1);
        return [...prev]})
  };
  const handleBeginChat = (e, id) => {
    e.preventDefault();
    const room = getRandomInt(1, 1000);
    const payload = {
      initiatorProfileId: sessionUser.profile_id,
      invitedUserProfileId: id,
      room: room,
      handleInvitedChatsArr: handleInvitedChatsArr,
      handleInitiatedChatsArr: handleInitiatedChatsArr,
    };
socket=io()
    socket.emit("notification", payload);

    setChatRoomInitiated((prev) =>
 [...prev, payload]
    );

  };

  useEffect(() => {
    socket = io();
    socket.on("notification", async (payload)=> {
    //   console.log(
    //     payload.invitedUserProfileId === sessionUser?.profile_id &&
    //       payload.initiatorProfileId !== sessionUser?.profile_id
    //   );
      if (
        payload.invitedUserProfileId === sessionUser?.profile_id &&
        payload.initiatorProfileId !== sessionUser?.profile_id
      ) {
        payload.invited = true;
        payload.handleInvitedChatsArr=handleInvitedChatsArr;
        payload.handleInitiatedChatsArr=handleInitiatedChatsArr;

        await setChatRoomInvited((prev) => [...prev, payload]);

      }
    });
  }, []);

  // socket?.on("notification",async(data)=>{
  //     console.log(data)
  //     console.log(Number(data.invitedUserProfileId)===Number(sessionUser.profile_id) && Number(data.initiatorProfileId)!==Number(sessionUser.profile_id))
  //     if(data.invitedUserProfileId===sessionUser.profile_id && data.initiatorProfileId!==sessionUser.profile_id){
  //        await setChatRoomInvited((prev)=>[...prev,data.room]);

  //     }
  // //     // setNotification((prev)=>[...prev,data])
  // })

  if (!sessionUser) {
    return <Redirect to="/" />;
  }

  console.log(chatRoomInitiated);
  console.log(chatRoomInvited)

  return (
    <>
      <div className="users-on-usersLiveChat">
        <p>Users</p>
        <ul>
          {onlineUsers.map((user) => (
            <li>
              {user.first_name} {user.last_name}{" "}
              <img src={onlineUser} id="online-offline-user-circle" />
              <button onClick={(e) => handleBeginChat(e, user.profile_id)}>
                Chat
              </button>{" "}
            </li>
          ))}
        </ul>
        <ul>
          {offlineUsers.map((user) => (
            <li>
              {user.first_name} {user.last_name}{" "}
              <img src={offlineUser} id="online-offline-user-circle" />{" "}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Chats initiated</h1>
        { chatRoomInitiated?.length!==0  &&
          chatRoomInitiated.map((roomData) => <LiveChat props={roomData} />)}
      </div>
      <div>
        <h1>Chats invited</h1>
        {  chatRoomInvited?.length!==0 &&
          chatRoomInvited.map((roomData) => <LiveChat props={roomData} />)}
      </div>
    </>
  );
};

export default UsersLiveChat;


// if(chatRoomInitiated.length!==0){
//     setChatroomInitiated((prev) => [...prev, payload]);
//     }
//     if(chatRoomInitiated.length===0){
//     setChatroomInitiated([payload])
//     }
