import React, { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import "./ManageEvents.css"

import { Link } from "react-router-dom";
import { getEventsThunk } from "../../store/events";


import { motion, AnimatePresence } from "framer-motion"
import { authenticate } from "../../store/session";
import OpenModalButton from "../OpenModalButton";
import DeleteEventModal from "../DeleteEventModal";
import EditEventModal from "../EditEventModal";
function ManageEvents(props){
    const dispatch = useDispatch();
    const [isLoaded,setIsLoaded]=useState(false);
    const [user,setUser]=useState("");
    const events=Object.values(useSelector((state)=>state.events))




    useEffect(() => {

        const getUser=async()=>{
            await dispatch(authenticate()).then(res=>setUser(res));
            await dispatch(getEventsThunk())

            setIsLoaded(true);

        }
        getUser();

    },[isLoaded])
const currentUserEvents=events.filter(event=>event?.organizer_id===user?.id)






    return (
<>{isLoaded && currentUserEvents.length===0 && <p>You don't have any events.</p>}
{isLoaded && currentUserEvents.map(event=>(
   <div className="manage-events-event"> <p>{event.location_name},{event.time.slice(0,22)}</p>
   <p>{event.details}</p>
   <p>{event.need_people_total ? <span>{`Available room for ${event.left_room_for}/out of ${event.need_people_total}`}</span> : "Everyone is invited!"}</p>
   <p>Interests: <ul>{Object.keys(event).map((a)=>(
 event[a]===true && <li key={a}>{a}</li>

))}
        </ul>
        </p>
   <p>Created on:{event.time_created.slice(0,22)}</p>
   <div className="manage-events-delete-and-edit">
<OpenModalButton buttonText="Delete event"
                    modalComponent={<DeleteEventModal props={event.id} />}
                  />
<OpenModalButton buttonText="Edit event"
                    modalComponent={<EditEventModal props={{eventId:event.id,condoId:user.condo_id}} />}
                  />
                  </div>


   </div>

))}

</>
    )
}

export default ManageEvents;
