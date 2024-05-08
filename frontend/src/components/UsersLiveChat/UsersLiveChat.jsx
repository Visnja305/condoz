import { useEffect, useState } from "react";

import { useSelector, useDispatch } from "react-redux";
import {
  Navigate
} from "react-router-dom";
import { useParams} from "react-router-dom";
import { io } from "socket.io-client";
import LiveChat from "../LiveChat";
import "./UsersLiveChat.css";
import { getUsersThunk } from "../../store/users";
import onlineUser from "../logos/online.png";
import offlineUser from "../logos/offline.png";
import {getOnlineAndOfflineUsersThunk} from "../../store/users";
let socket;

const UsersLiveChat = () => {
  const {id}=useParams();

  const dispatch = useDispatch();

  const [isLoaded, setIsLoaded] = useState(false);

  const [chatRoomInitiated, setChatRoomInitiated] = useState([]);
  const [chatRoomInvited, setChatRoomInvited] = useState([]);


  const sessionUser = useSelector((state) => state.session.user);
  const onlineUsers = useSelector((state) => state.users["onlineUsers"]);

  const offlineUsers=useSelector((state) => state.users["offlineUsers"]);


  useEffect(() => {
    const getData = async () => {
      await dispatch(getUsersThunk());
      // await dispatch(getOnlineUsersThunk());
      // await dispatch(getOfflineUsersThunk());
      await dispatch(getOnlineAndOfflineUsersThunk())
      console.log("from users live chat!!!!",isLoaded)
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
    console.log("I am invited and leaving!!!!!!",props)
        const index =prev.indexOf(props);
        prev.splice(index, 1);
        return [...prev]})
  };
  const handleInitiatedChatsArr = (props) => {
    return setChatRoomInitiated(prev=>{
        console.log("I initiated and leaving!!!!!!",props)
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
      room: room
    };

//     if (process.env.NODE_ENV === 'production'){
//         socket=io("wss://condoz.onrender.com")
//     }
// else{
// socket=io()
// }
// socket=io(import.meta.env.PROD===true ? "https://condoz.onrender.com/socket.io" : "")
socket=io()
    socket.emit("notification", payload);
    payload.handleInvitedChatsArr= handleInvitedChatsArr;
    payload.handleInitiatedChatsArr=handleInitiatedChatsArr;

    setChatRoomInitiated((prev) =>
 [...prev, payload]
    );

  };




  useEffect(() => {

//     if (process.env.NODE_ENV === 'production'){
//         socket=io("wss://condoz.onrender.com")
//     }
// else{
// socket=io()
// }
// socket=io(import.meta.env.PROD===true ? "https://condoz.onrender.com/socket.io" : "");
socket=io();
    socket.on("notification", async (payload)=> {

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


  if (!sessionUser) {
    return <Navigate to="/" />;
  }
function removingExtraChats(arr,initiatorOrInvited){
    let roomNumbers=[];
    let chatInitiators=[];


    for(let i=0;i<arr.length;i++){
    if(!roomNumbers.includes(arr[i].room)){

    roomNumbers.push(arr[i].room)
    }
    else{
        arr.splice(i, 1);
        i--
    }
    }

    for(let i=0;i<arr.length;i++){
        if(!chatInitiators.includes(arr[i][initiatorOrInvited])){

            chatInitiators.push(arr[i][initiatorOrInvited])
        }
        else{
            arr.splice(i, 1);
            i--
        }
        }
}

removingExtraChats(chatRoomInvited,"initiatorProfileId")
removingExtraChats(chatRoomInitiated,"invitedUserProfileId")
  console.log(chatRoomInitiated);
  console.log(chatRoomInvited)

  return (
    <>
      <div className="users-on-usersLiveChat">
        <p>Users</p>
        <ul>
          {onlineUsers?.map((user) => user.id!==sessionUser.id && (
            <li key={`${user.id}-ulc`}>
              {user.first_name} {user.last_name}{" "}
              <img src={onlineUser} id="online-offline-user-circle" />
              <button onClick={(e) => handleBeginChat(e, user.profile_id)}>
                Chat
              </button>{" "}
            </li>
          ) )}
        </ul>
        <ul>
          {offlineUsers?.map((user) => (
            <li key={`${user.id}-ulco`}>
              {user.first_name} {user.last_name}{" "}
              <img src={offlineUser} id="online-offline-user-circle" />{" "}
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h1>Chats initiated</h1>
        { chatRoomInitiated?.length!==0  &&
          chatRoomInitiated.map((roomData) => <div key={`${roomData.room}`}><LiveChat props={roomData} /></div>)}
      </div>
      <div>
        <h1>Chats invited</h1>
        {  chatRoomInvited?.length!==0 &&
          chatRoomInvited.map((roomData) =><div key={`${roomData.room}`}><LiveChat props={roomData} /></div> )}
      </div>
    </>
  );
};

export default UsersLiveChat;
