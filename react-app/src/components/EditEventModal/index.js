import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

import { useHistory } from "react-router-dom";
import { editUserProfileThunk } from "../../store/userProfiles";
import "./EditEventModal.css";
import educationLogo from "../logos/education-logo.png"
import profileImageLogo from "../logos/profile-image-icon.png";
import ageIcon from "../logos/age-icon.png";
import workLogo from "../logos/work-logo-black.png";
import homeIcon from "../logos/home-icon.png"
import activityLogo from "../logos/activity-logo.png"
import { editEventThunk } from "../../store/events";





function EditEventModal({props}) {
    const { closeModal } = useModal();
    console.log(props)
    const eventId=props.eventId;
    const condoId=props.condoId;
    const history=useHistory();
    const dispatch=useDispatch();
    const event=useSelector((state)=>state.events[eventId]);
    const condos=useSelector((state)=>state.condos);
    const sessionUser=useSelector((state)=>state.session.user)
    const usersCondo=condos[condoId];
const eventTime=event.time.slice(0,22);
const monthToTransform=eventTime.slice(8,11)
function transformMonth(month){
let transformedMonth
if (month==="Jan"){
    transformedMonth="01"
}
if (month==="Feb"){
    transformedMonth="02"
}
if (month==="Mar"){
    transformedMonth="03"
}
if (month==="Apr"){
    transformedMonth="04"
}
if (month==="May"){
    transformedMonth="05"
}
if (month==="Jun"){
    transformedMonth="06"
}
if (month==="Jul"){
    transformedMonth="07"
}
if (month==="Aug"){
    transformedMonth="08"
}
if (month==="Sep"){
    transformedMonth="09"
}
if (month==="Oct"){
    transformedMonth="10"
}
if (month==="Nov"){
    transformedMonth="11"
}
if (monthToTransform==="Dec"){
    transformedMonth="12"
}
return transformedMonth
}
const month=transformMonth(monthToTransform)


const transformedDate=`${eventTime.slice(12,16)}-${month}-${eventTime.slice(5,7)}T${eventTime.slice(17,22)}`






const [checkedUsersCondo,setCheckedUsersCondo]=useState(String(condoId)===event.location);
const [checkedOtherLocation,setCheckedOtherLocation]=useState(String(condoId)!==event.location);

const [location,setLocation]=useState(checkedOtherLocation ? event.location_name : "");

const [dateTime,setDateTime]=useState(transformedDate);
const [description,setDescription]=useState(event.details);
const [peopleNeeded,setPeopleNeeded]=useState(event.need_people_total);
const [notApplicable,setNotApplicable]=useState(event.need_people_total===null);
const [checkedTennis, setCheckedTennis] = useState(event.tennis);
const [checkedPadel, setCheckedPadel] = useState(event.padel);
const [checkedPickleball, setCheckedPickleball] = useState(event.pickleball);
const [checkedGolf, setCheckedGolf] = useState(event.golf);
const [checkedGym, setCheckedGym] = useState(event.gym);
const [checkedBoating, setCheckedBoating] = useState(event.boating);
const [checkedJogging, setCheckedJogging] = useState(event.jogging);
const [checkedDogs, setCheckedDogs] = useState(event.dogs);
const [checkedKidsActivities, setCheckedKidsActivities] = useState(event.kids_activities);
const [checkedSoccer, setCheckedSoccer] = useState(event.soccer);
const [checkedCocktailHour, setCheckedCocktailHour] = useState(event.cocktail_hour);
const [checkedPhilanthropy, setCheckedPhilanthropy] = useState(event.philanthropy);
const [checkedBasketball, setCheckedBasketball] = useState(event.basketball);
const [checkedArt, setCheckedArt] = useState(event.art);
const [checkedSpa, setCheckedSpa] = useState(event.spa);
const [checkedFineDining, setCheckedFineDining] = useState(event.fine_dining);
const [checkedPolo, setCheckedPolo] = useState(event.polo);
const [checkedScubaDiving, setCheckedScubaDiving] = useState(event.scuba_diving);
const [checkedHorsebackRiding, setCheckedHorsebackRiding] = useState(event.horseback_riding);
const [checkedYoga, setCheckedYoga] = useState(event.yoga);
const [checkedBoxing, setCheckedBoxing] = useState(event.boxing);
const [checkedOther, setCheckedOther]=useState(event.other);
const [isLoaded,setIsLoaded]=useState(false);
const [errors, setErrors] = useState({})


const currentDateTime =new Date(new Date().getTime() - new Date().getTimezoneOffset() * 60000).toISOString().slice(0,-8);
console.log(currentDateTime)







const handleSubmit =async(e) => {
    e.preventDefault();


    setErrors({});
    const formData = new FormData();
    formData.append("organizer_id",sessionUser.id);
    formData.append("organizer_profile_id",sessionUser.profile_id);
    if(checkedOtherLocation){
    formData.append("location",location);
    formData.append("location_name",location)
    }
    if(!checkedOtherLocation){
    formData.append("location",sessionUser.condo_id);
    formData.append("location_name",usersCondo.name);
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



    await dispatch(editEventThunk(formData,eventId)).then(closeModal()).catch(
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











    return(<>
        <p>Update information</p>
        <form className="edit-event-form" onSubmit={handleSubmit}>

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
      <input value = {notApplicable} type = "checkbox" onChange = {handleNotApplicable} checked={notApplicable} />
      </label>




      <img src={activityLogo} id="create-user-profile-logos"/>
       <p> Related Interests:</p>
      <label>
        Tennis
      <input value = {checkedTennis} type = "checkbox" onChange = {handleChangeTennis} checked={checkedTennis}/>
      </label>
      <label>
        Padel
      <input value = {checkedPadel} type = "checkbox" onChange = {handleChangePadel} checked={checkedPadel} />
      </label>
      <label>
        Pickleball
      <input value = {checkedPickleball} type = "checkbox" onChange = {handleChangePickleball} checked={checkedPickleball} />
      </label>
      <label>
        Golf
      <input value = {checkedGolf} type = "checkbox" onChange = {handleChangeGolf} checked={checkedGolf} />
      </label>
      <label>
        Gym
      <input value = {checkedGym} type = "checkbox" onChange = {handleChangeGym} checked={checkedGym} />
      </label>
      <label>
        Boating
      <input value = {checkedBoating} type = "checkbox" onChange = {handleChangeBoating} checked={checkedBoating} />
      </label>
      <label>
        Jogging
      <input value = {checkedJogging} type = "checkbox" onChange = {handleChangeJogging} checked={checkedJogging} />
      </label>
      <label>
        Dogs
      <input value = {checkedDogs} type = "checkbox" onChange = {handleChangeDogs} checked={checkedDogs} />
      </label>
      <label>
        Kids activities
      <input value = {checkedKidsActivities} type = "checkbox" onChange = {handleChangeKidsActivities} checked={checkedKidsActivities} />
      </label>
      <label>
        Soccer
      <input value = {checkedSoccer} type = "checkbox" onChange = {handleChangeSoccer} checked={checkedSoccer} />
      </label>
      <label>
        Cocktail hour
      <input value = {checkedCocktailHour} type = "checkbox" onChange = {handleChangeCocktailHour} checked={checkedCocktailHour} />
      </label>
      <label>
        Philanthropy
      <input value = {checkedPhilanthropy} type = "checkbox" onChange = {handleChangePhilanthropy} checked={checkedPhilanthropy} />
      </label>
      <label>
        Basketball
      <input value = {checkedBasketball} type = "checkbox" onChange = {handleChangeBasketball} checked={checkedBasketball} />
      </label>
      <label>
        Art
      <input value = {checkedArt} type = "checkbox" onChange = {handleChangeArt} checked={checkedArt} />
      </label>
      <label>
        Spa
      <input value = {checkedSpa} type = "checkbox" onChange = {handleChangeSpa} checked={checkedSpa} />
      </label>
      <label>
        Fine-dining
      <input value = {checkedFineDining} type = "checkbox" onChange = {handleChangeFineDining} checked={checkedFineDining} />
      </label>
      <label>
        Polo
      <input value = {checkedPolo} type = "checkbox" onChange = {handleChangePolo} checked={checkedPolo} />
      </label>
      <label>
        Scuba-diving
      <input value = {checkedScubaDiving} type = "checkbox" onChange = {handleChangeScubaDiving} checked={checkedScubaDiving} />
      </label>
      <label>
        Horseback riding
      <input value = {checkedHorsebackRiding} type = "checkbox" onChange = {handleChangeHorsebackRiding} checked={checkedHorsebackRiding} />
      </label>
      <label>
        Yoga
      <input value = {checkedYoga} type = "checkbox" onChange = {handleChangeYoga} checked={checkedYoga} />
      </label>
      <label>
        Boxing
      <input value = {checkedBoxing} type = "checkbox" onChange = {handleChangeBoxing} checked={checkedBoxing} />
      </label>
      <label>
        Other
      <input value = {checkedOther} type = "checkbox" onChange = {handleChangeOther} checked={checkedOther} />
      </label>

      <button id="submit-for-create-event" type="submit" >Edit event</button>
      </form>


</>
    )
}

export default EditEventModal;
