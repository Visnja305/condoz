import { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import "./ShowEvents.css";
import { getEventsThunk } from "../../store/events";
import UserProfileSmall from "../UserProfileSmall";
import CommentsSection from "../CommentsSection";


function ShowEvents({props}){
    const locationFilter= props.location;
    const interestFilter=props.interest;



    const dispatch = useDispatch();
    const [isLoaded,setIsLoaded]=useState(false);


    const events=Object.values(useSelector((state)=>state.events))





    useEffect(() => {

        const getData=async()=>{
            await dispatch(getEventsThunk());
            setIsLoaded(true);

        }
        getData();






    },[isLoaded])

function filterFunction(event){
    if(locationFilter==="other" && interestFilter===""){



        return event.location===event.location_name

    }
    if(locationFilter==="other" && interestFilter!==""){

        return event.location===event.location_name &&
        event[interestFilter]===true

    }

    if(locationFilter!=="" && interestFilter===""){
        return event.location===locationFilter
    }
    if(locationFilter==="" && interestFilter!==""){

        return event[interestFilter]===true
    }
    if(locationFilter!=="" && interestFilter!==""){

        return event.location===locationFilter &&
        event[interestFilter]===true

    }
}


let searchedEvents

    return (
<><h1>Events</h1>

{props.location==="" && props.interest==="" &&
<div> {events.map(event=>(
   <div className="show-events-event">
    <div className="show-event">
   <p>{event.location_name},{event?.time.slice(0,22)}</p>
   <p>{event.details}</p>
   <p>{event.need_people_total ? <span>{`Available room for ${event.left_room_for}/out of ${event.need_people_total}`}</span> : "Everyone is invited!"}</p>
   <p>Interests: <ul>{Object.keys(event).map((a)=>(
 event[a]===true && <li key={a}>{a}</li>

))}
        </ul>
        </p>
   <p>Organized by: </p>

   <UserProfileSmall userId={event.organizer_id} />
   <p>Created/last updated:{event.time_created.slice(0,22)}</p>
   </div>
   <div className="show-event-comments">

<CommentsSection eventId={event.id}/>

   </div>
   </div>
))
} </div>
}

{((locationFilter!=="" && interestFilter==="") || (locationFilter==="" && interestFilter!=="") || (locationFilter!=="" && interestFilter!=="") ) &&  <div>
    { events.filter(filterFunction).length!==0 ?


events.filter(filterFunction).map(event=>(
   <div className="show-events-event">
    <div className="show-event">
   <p>{event.location_name},{event.time.slice(0,22)}</p>
   <p>{event.details}</p>
   <p>{event.need_people_total ? <span>{`Available room for ${event.left_room_for}/out of ${event.need_people_total}`}</span> : "Everyone is invited!"}</p>
   <p>Interests: <ul>{Object.keys(event).map((a)=>(
 event[a]===true && <li key={a}>{a}</li>

))}
        </ul>
        </p>
   <p>Organized by: </p>

   <UserProfileSmall userId={event.organizer_id} />
   <p>Created/last updated:{event.time_created.slice(0,22)}</p>
   </div>
   <div className="show-event-comments">

<CommentsSection eventId={event.id}/>

   </div>
   </div>
)) : "No events found"


    }

    </div>}

</>
    )
}

export default ShowEvents;
