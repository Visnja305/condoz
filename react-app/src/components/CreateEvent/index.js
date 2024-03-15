import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { authenticate } from "../../store/session";
import {getCondosThunk} from "../../store/condos"
import {createEventThunk} from "../../store/events"



import activityLogo from ".././logos/activity-logo.png"
import "./CreateEvent.css";
// import { disabled } from "express/lib/application";




function CreateEvent() {
const dispatch = useDispatch();
const sessionUser = useSelector((state) => state.session.user);
const condos=useSelector((state)=>state.condos);
console.log(sessionUser)
const usersCondoId=sessionUser?.condo_id;
const usersCondo=condos[usersCondoId];
console.log(usersCondoId)
console.log(usersCondo)
const [checkedUsersCondo,setCheckedUsersCondo]=useState(true);
const [checkedOtherLocation,setCheckedOtherLocation]=useState(false);
const [location,setLocation]=useState("");
const [dateTime,setDateTime]=useState("");
const [description,setDescription]=useState("");
const [peopleNeeded,setPeopleNeeded]=useState("");
const [notApplicable,setNotApplicable]=useState(false);
const [checkedTennis, setCheckedTennis] = useState(false);
const [checkedPadel, setCheckedPadel] = useState(false);
const [checkedPickleball, setCheckedPickleball] = useState(false);
const [checkedGolf, setCheckedGolf] = useState(false);
const [checkedGym, setCheckedGym] = useState(false);
const [checkedBoating, setCheckedBoating] = useState(false);
const [checkedJogging, setCheckedJogging] = useState(false);
const [checkedDogs, setCheckedDogs] = useState(false);
const [checkedKidsActivities, setCheckedKidsActivities] = useState(false);
const [checkedSoccer, setCheckedSoccer] = useState(false);
const [checkedCocktailHour, setCheckedCocktailHour] = useState(false);
const [checkedPhilanthropy, setCheckedPhilanthropy] = useState(false);
const [checkedBasketball, setCheckedBasketball] = useState(false);
const [checkedArt, setCheckedArt] = useState(false);
const [checkedSpa, setCheckedSpa] = useState(false);
const [checkedFineDining, setCheckedFineDining] = useState(false);
const [checkedPolo, setCheckedPolo] = useState(false);
const [checkedScubaDiving, setCheckedScubaDiving] = useState(false);
const [checkedHorsebackRiding, setCheckedHorsebackRiding] = useState(false);
const [checkedYoga, setCheckedYoga] = useState(false);
const [checkedBoxing, setCheckedBoxing] = useState(false);
const [checkedOther, setCheckedOther]=useState(false);
const [isLoaded,setIsLoaded]=useState(false);
const [errors, setErrors] = useState({});


  const currentDateTime =new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0,-8);






    useEffect(() => {

        const getUser=async()=>{
            await dispatch(authenticate());
            await dispatch(getCondosThunk())
            setIsLoaded(true);

        }
        if(!isLoaded){
        getUser();}



    },[dispatch,isLoaded])

const handleSubmit =async(e) => {
    e.preventDefault();


    setErrors({});
    const formData = new FormData();
    formData.append("organizer_id",sessionUser.id);
    formData.append("organizer_profile_id",sessionUser.profile_id);
    if(checkedOtherLocation){
    formData.append("location",location);
    }
    if(!checkedOtherLocation){
    formData.append("location",sessionUser.condo_id);
    }
    formData.append("details",description);
    formData.append("time",dateTime);
    formData.append("time_created",currentDateTime);
    if(notApplicable){
    formData.append("need_people_total","");
    formData.append("left_room_for","")
}
    if(!notApplicable){
    formData.append("need_people_total",peopleNeeded);
    formData.append("left_room_for",peopleNeeded);
    }
    formData.append("tennis", checkedTennis);
    formData.append("padel", checkedPadel);
    formData.append("pickleball", checkedPickleball);
    formData.append("golf", checkedGolf);
    formData.append("gym", checkedGym);
    formData.append("boating", checkedBoating);
    formData.append("jogging", checkedJogging);
    formData.append("dogs", checkedDogs);
    formData.append("kids_activities", checkedKidsActivities);
    formData.append("soccer", checkedSoccer);
    formData.append("cocktail_hour", checkedCocktailHour);
    formData.append("philanthropy", checkedPhilanthropy);
    formData.append("basketball", checkedBasketball);
    formData.append("art", checkedArt);
    formData.append("spa", checkedSpa);
    formData.append("fine_dining", checkedFineDining);
    formData.append("polo", checkedPolo);
    formData.append("scuba_diving", checkedScubaDiving);
    formData.append("horseback_riding", checkedHorsebackRiding);
    formData.append("yoga", checkedYoga);
    formData.append("boxing", checkedBoxing);
    formData.append("other",checkedOther);
    for (const key of formData.values()) {
        console.log(key);
      }


    await dispatch(createEventThunk(formData)).catch(
        async (res) => {

         console.log(res)

  })


  }

  const handleChangeLocationUsersCondo=()=>{
setCheckedUsersCondo(!checkedUsersCondo);
setCheckedOtherLocation(checkedUsersCondo);


  }
  const handleChangeLocationOther=()=>{
    setCheckedOtherLocation(!checkedOtherLocation);
    setCheckedUsersCondo(checkedOtherLocation);
  }
  const handleNotApplicable=()=>{
    setNotApplicable(!notApplicable)
  }
  const handleChangeTennis= () => {
    setCheckedTennis(!checkedTennis);
  };
  const handleChangePadel= () => {
    setCheckedPadel(!checkedPadel);
  };
  const handleChangePickleball= () => {
    setCheckedPickleball(!checkedPickleball);
  };

  const handleChangeGolf = () => {
    setCheckedGolf(!checkedGolf);
  };
  const handleChangeGym = () => {
    setCheckedGym(!checkedGym);
  };
  const handleChangeBoating = () => {
    setCheckedBoating(!checkedBoating);
  };
  const handleChangeJogging = () => {
    setCheckedJogging(!checkedJogging);
  };
  const handleChangeDogs = () => {
    setCheckedDogs(!checkedDogs);
  };
  const handleChangeKidsActivities = () => {
    setCheckedKidsActivities(!checkedKidsActivities);
  };
  const handleChangeSoccer = () => {
    setCheckedSoccer(!checkedSoccer);
  };
  const handleChangeCocktailHour = () => {
    setCheckedCocktailHour(!checkedCocktailHour);
  };
  const handleChangePhilanthropy = () => {
    setCheckedPhilanthropy(!checkedPhilanthropy);
  };
  const handleChangeBasketball = () => {
    setCheckedBasketball(!checkedBasketball);
  };
  const handleChangeArt = () => {
    setCheckedArt(!checkedArt);
  };
  const handleChangeSpa = () => {
    setCheckedSpa(!checkedSpa);
  };
  const handleChangeFineDining = () => {
    setCheckedFineDining(!checkedFineDining);
  };
  const handleChangePolo = () => {
    setCheckedPolo(!checkedPolo);
  };
  const handleChangeScubaDiving = () => {
    setCheckedScubaDiving(!checkedScubaDiving);
  };
  const handleChangeHorsebackRiding = () => {
    setCheckedHorsebackRiding(!checkedHorsebackRiding);
  };
  const handleChangeYoga = () => {
    setCheckedYoga(!checkedYoga);
  };
  const handleChangeBoxing = () => {
    setCheckedBoxing(!checkedBoxing);
  };
  const handleChangeOther=()=>{
    setCheckedOther(!checkedOther);
  }
if(!isLoaded){
    return <h1>is loading...</h1>
}



	return (
		<div>
            <h1>Create an Event!</h1>
<form className="create-event-form" onSubmit={handleSubmit} >

<div className="radio">
    <p>Location</p>
          <label>
          {usersCondo.name},{usersCondo.address}
            <input type="radio" value={checkedUsersCondo} onChange = {handleChangeLocationUsersCondo} checked={checkedUsersCondo} />
            </label>


          <label>
            Other

            <input id="create-event-other-location" type="radio" value={checkedOtherLocation} onChange = {handleChangeLocationOther} checked={checkedOtherLocation} />
            </label>

          {checkedOtherLocation &&

            <label>
            Set location:
            <input id="create-event-setting-location"
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}

                    />

            </label>

 }

        </div>
                <label>
                    Date and time
                    <input
                    type="datetime-local"
                    id="create-event-date-time"
                    name="event-time"
                    value={dateTime}
                    min={currentDateTime}
                    max="2100-06-14T00:00"
                    onChange={(e)=>{setDateTime(e.target.value)}}
                    required/>
                </label>
                <label>

                 Description
                 <input id="create-event-description"
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
      </label>
                <label>

            How many participants are needed for the event?
            <input id="create-event-people-needed"
            type="text"
            value={peopleNeeded}
            onChange={(e) => setPeopleNeeded(e.target.value)}
             disabled={notApplicable}
             required={!notApplicable}
            />
            </label>
            <label>
        N/A
      <input value = {notApplicable} type = "checkbox" onChange = {handleNotApplicable} />
      </label>




      <img src={activityLogo} id="create-user-profile-logos"/>
       <p> Related Interests:</p>
      <label>
        Tennis
      <input value = {checkedTennis} type = "checkbox" onChange = {handleChangeTennis} />
      </label>
      <label>
        Padel
      <input value = {checkedPadel} type = "checkbox" onChange = {handleChangePadel} />
      </label>
      <label>
        Pickleball
      <input value = {checkedPickleball} type = "checkbox" onChange = {handleChangePickleball} />
      </label>
      <label>
        Golf
      <input value = {checkedGolf} type = "checkbox" onChange = {handleChangeGolf} />
      </label>
      <label>
        Gym
      <input value = {checkedGym} type = "checkbox" onChange = {handleChangeGym} />
      </label>
      <label>
        Boating
      <input value = {checkedBoating} type = "checkbox" onChange = {handleChangeBoating} />
      </label>
      <label>
        Jogging
      <input value = {checkedJogging} type = "checkbox" onChange = {handleChangeJogging} />
      </label>
      <label>
        Dogs
      <input value = {checkedDogs} type = "checkbox" onChange = {handleChangeDogs} />
      </label>
      <label>
        Kids activities
      <input value = {checkedKidsActivities} type = "checkbox" onChange = {handleChangeKidsActivities} />
      </label>
      <label>
        Soccer
      <input value = {checkedSoccer} type = "checkbox" onChange = {handleChangeSoccer} />
      </label>
      <label>
        Cocktail hour
      <input value = {checkedCocktailHour} type = "checkbox" onChange = {handleChangeCocktailHour} />
      </label>
      <label>
        Philanthropy
      <input value = {checkedPhilanthropy} type = "checkbox" onChange = {handleChangePhilanthropy} />
      </label>
      <label>
        Basketball
      <input value = {checkedBasketball} type = "checkbox" onChange = {handleChangeBasketball} />
      </label>
      <label>
        Art
      <input value = {checkedArt} type = "checkbox" onChange = {handleChangeArt} />
      </label>
      <label>
        Spa
      <input value = {checkedSpa} type = "checkbox" onChange = {handleChangeSpa} />
      </label>
      <label>
        Fine-dining
      <input value = {checkedFineDining} type = "checkbox" onChange = {handleChangeFineDining} />
      </label>
      <label>
        Polo
      <input value = {checkedPolo} type = "checkbox" onChange = {handleChangePolo} />
      </label>
      <label>
        Scuba-diving
      <input value = {checkedScubaDiving} type = "checkbox" onChange = {handleChangeScubaDiving} />
      </label>
      <label>
        Horseback riding
      <input value = {checkedHorsebackRiding} type = "checkbox" onChange = {handleChangeHorsebackRiding} />
      </label>
      <label>
        Yoga
      <input value = {checkedYoga} type = "checkbox" onChange = {handleChangeYoga} />
      </label>
      <label>
        Boxing
      <input value = {checkedBoxing} type = "checkbox" onChange = {handleChangeBoxing} />
      </label>
      <label>
        Other
      <input value = {checkedOther} type = "checkbox" onChange = {handleChangeOther} />
      </label>

      <button id="submit-for-create-event" type="submit" >Create event</button>
      </form>





        </div>

	);
}

export default CreateEvent;
