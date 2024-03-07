import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./CreateUserProfileModal.css";
import educationLogo from ".././logos/education-logo.png"
import profileImageLogo from ".././logos/profile-image-icon.png";
import ageIcon from ".././logos/age-icon.png";
import workLogo from ".././logos/work-logo-black.png";
import homeIcon from ".././logos/home-icon.png"
import activityLogo from ".././logos/activity-logo.png"



function CreateUserProfileModal() {
const sessionUser = useSelector((state) => state.session.user);

const [profileImage, setProfileImage]=useState("");
const [dateOfBirth,setDateOfBirth]=useState("2024-01-01");
const [usersAge,setUsersAge]=useState("");
const [work,setWork]=useState("");
const [education,setEducation]=useState("");
const [hometown,setHometown]=useState("");
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
const [errors, setErrors] = useState({});
function calculateAge(dateOfBirth)
{
  const now = new Date();

  const usrDate=new Date(dateOfBirth)

  const diff = Math.abs(now - usrDate);

  const age = Math.floor(diff / (1000 * 60 * 60 * 24 * 365));

  return age
}

useEffect(()=>{

const uAge=calculateAge(dateOfBirth)

setUsersAge(uAge)

}, [dateOfBirth]
)

const handleSubmit = (e) => {
    e.preventDefault();


    setErrors({});
    const formData = new FormData();
    formData.append("user_id",sessionUser.id);
    formData.append("condo_id",sessionUser.condo_id);
    formData.append("profile_img", profileImage);
    formData.append("age", profileImage);
    formData.append("work", profileImage);
    formData.append("education", profileImage);
    formData.append("hometown", profileImage);
    formData.append("tennis", profileImage);
    formData.append("padle", profileImage);
    formData.append("pickleball", profileImage);
    formData.append("golf", profileImage);
    formData.append("gym", profileImage);
    formData.append("boating", profileImage);
    formData.append("jogging", profileImage);
    formData.append("dogs", profileImage);
    formData.append("kids_activities", profileImage);
    formData.append("soccer", profileImage);
    formData.append("cocktail_hour", profileImage);
    formData.append("philanthropy", profileImage);
    formData.append("basketball", profileImage);
    formData.append("art", profileImage);
    formData.append("spa", profileImage);
    formData.append("fine_dining", profileImage);
    formData.append("polo", profileImage);
    formData.append("scuba_diving", profileImage);
    formData.append("horseback_riding", profileImage);
    formData.append("yoga", profileImage);
    formData.append("boxing", profileImage);



    dispatch(postCommentThunk(formData, trackId)).then(res => {
      if (typeof res === "string") {

        errors.content = res
        setErrors(errors)
      }

    })



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
    setCheckedGolf(!checkedGym);
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
    setCheckedPhilanthropy(!checkedCocktailHour);
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
	return (
		<div>
            <h1>Create your profile!</h1>
<form className="create-user-profile-form" onSubmit={handleSubmit}>
    <label>
        Set profile image
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setProfileImage(e.target.files[0])}
        />

      </label>

      <label>
      <img src={ageIcon} id="create-user-profile-logos"/>
        Date of birth:
        <input type="date" id="age" name="age" value={dateOfBirth} min="1920-01-01" max="2024-01-01" onChange={(e)=>setDateOfBirth(e.target.value)} required/>
      </label>
      <p>Age : {usersAge}</p>
      <label>
      <img src={workLogo} id="create-user-profile-logos"/>
        Work
        <input id="work-create-user-profile"
                  type="text"
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                  required
                />
      </label>
      <label>
      <img src={educationLogo} id="create-user-profile-logos"/>
        Education
        <input id="education-create-user-profile"
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  required
                />

      </label>
      <label>
      <img src={homeIcon} id="create-user-profile-logos"/>
        Hometown
        <input id="hometown-create-user-profile"
                  type="text"
                  value={hometown}
                  onChange={(e) => setHometown(e.target.value)}
                  required
                />
      </label>

      <img src={activityLogo} id="create-user-profile-logos"/>
        Interests:
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

      </form>





        </div>
	);
}

export default CreateUserProfileModal;

// const str_op = now.getFullYear() + '-' +(now.getMonth()+1) + '-' + now.getDate();
