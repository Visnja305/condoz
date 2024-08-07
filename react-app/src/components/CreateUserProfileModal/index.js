import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useModal } from "../../context/Modal";
import { signUp } from "../../store/session";
import "./CreateUserProfileModal.css";
import educationLogo from ".././logos/education-logo.png"
import profileImageLogo from ".././logos/profile-logo.png";
import ageIcon from ".././logos/age-icon.png";
import workLogo from ".././logos/work-logo-black.png";
import homeIcon from ".././logos/home-icon.png"
import activityLogo from ".././logos/activity-logo.png"
import {createUserProfileThunk} from "../../store/userProfiles"
import {editUsersHasProfileThunk} from "../../store/session"



function CreateUserProfileModal() {
const sessionUser = useSelector((state) => state.session.user);
const { closeModal } = useModal();
const dispatch = useDispatch();
const [profileImage, setProfileImage]=useState(profileImageLogo);
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
const [ageError,setAgeError]=useState("")

// const [errors, setErrors] = useState({});
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

const handleSubmit =async(e) => {
    e.preventDefault();
    if(usersAge<18){
      setAgeError("User can not be a minor")
    }

      else{






    const formData = new FormData();
    formData.append("user_id",sessionUser.id);
    formData.append("condo_id",sessionUser.condo_id);
    formData.append("profile_img", profileImage);
    formData.append("age", usersAge);
    formData.append("work", work);
    formData.append("education", education);
    formData.append("hometown", hometown);
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


const arr=[]

    await dispatch(createUserProfileThunk(formData)).then(res=>arr.push(res)).then(res=>closeModal()).catch(
        async (res) => {

         console.log(res)

  })
  console.log(arr)
if (arr.length){
    await dispatch(editUsersHasProfileThunk(arr[0]))
}

  }
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
  function previewFile(e) {
    let preview = document.getElementById("preview-image-create-profile");
console.log(e.target.files[0])
    let file    = e.target.files[0]
    let reader  = new FileReader();

    reader.onloadend = function () {
      preview.src = reader.result;
      const theImage=preview.src
      setProfileImage(theImage)
    }
console.log(file)
    if (file) {
      reader.readAsDataURL(file);
    } else {
      preview.src = "";
    }
  }
	return (
		<div className="create-user-profile-container">
            <h1>Create your profile!</h1>
<form className="create-user-profile-form" onSubmit={handleSubmit}>
    <label>
        Set profile image
        <input
          id="user-profile-image"
          type="file"
          accept="image/*"
          onChange={(e)=>{previewFile(e)}}

        />

      </label>

      <img id="preview-image-create-profile" src={`${profileImageLogo}`} height="100px" width="100px" alt="Image preview..."></img>

      <label>
      <img src={ageIcon} id="create-user-profile-logos"/>
        Date of birth:
        <input type="date" id="age" name="age" value={dateOfBirth} min="1920-01-01" max="2024-01-01" onChange={(e)=>setDateOfBirth(e.target.value)} required/>
      </label>
      <p>{ageError && ageError}</p>
      <p>Age : {usersAge}</p>

      <label >
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
      <button id="submit-for-create-user-profile" type="submit" >Create profile</button>
      </form>





        </div>
	);
}

export default CreateUserProfileModal;

// const str_op = now.getFullYear() + '-' +(now.getMonth()+1) + '-' + now.getDate();

// dispatch(createUserProfileThunk(formData)).then(res=>closeModal()).catch(
//     async (res) => {

//       const myData = await res.json();


//       if (myData && myData.errors) {
//           setErrors(myData.errors);
// return errors
//        };

// })


// dispatch(createUserProfileThunk(formData)).then(res=>editUsersHasProfileThunk(res.id)).then(res=>closeModal()).catch(
//     async (res) => {

//      console.log(res)

// })


// onChange={(e) => setProfileImage(e.target.files[0])}
