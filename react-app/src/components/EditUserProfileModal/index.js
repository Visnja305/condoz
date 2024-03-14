import React, { useEffect, useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import { useModal } from "../../context/Modal";

import { useHistory } from "react-router-dom";
import { editUserProfileThunk } from "../../store/userProfiles";
import "./EditUserProfileModal.css";
import educationLogo from "../logos/education-logo.png"
import profileImageLogo from "../logos/profile-image-icon.png";
import ageIcon from "../logos/age-icon.png";
import workLogo from "../logos/work-logo-black.png";
import homeIcon from "../logos/home-icon.png"
import activityLogo from "../logos/activity-logo.png"
import { authenticate } from "../../store/session";
import { getProfileThunk } from "../../store/userProfiles";




function EditUserProfileModal(props) {
    const { closeModal } = useModal();
    const profileId=props.props.profileId;
    const userId=props.props.userId;
// console.log(profileId)
// console.log(userId)
const sessionUser = useSelector((state) => state.session.user);
const userProfile=useSelector((state)=>state.userProfiles[userId]);
    const history=useHistory();
    const dispatch=useDispatch();

    // console.log(sessionUser)
    //  console.log(userProfile.age)



const [profileImage, setProfileImage]=useState("");

const [usersAge,setUsersAge]=useState(userProfile.age);
const [work,setWork]=useState(userProfile.work);
const [education,setEducation]=useState(userProfile.education);
const [hometown,setHometown]=useState(userProfile.hometown);
const [checkedTennis, setCheckedTennis] = useState(userProfile.tennis);
const [checkedPadel, setCheckedPadel] = useState(userProfile.padel);
const [checkedPickleball, setCheckedPickleball] = useState(userProfile.pickleball);
const [checkedGolf, setCheckedGolf] = useState(userProfile.golf);
const [checkedGym, setCheckedGym] = useState(userProfile.gym);
const [checkedBoating, setCheckedBoating] = useState(userProfile.boating);
const [checkedJogging, setCheckedJogging] = useState(userProfile.jogging);
const [checkedDogs, setCheckedDogs] = useState(userProfile.dogs);
const [checkedKidsActivities, setCheckedKidsActivities] = useState(userProfile.kids_activities);
const [checkedSoccer, setCheckedSoccer] = useState(userProfile.soccer);
const [checkedCocktailHour, setCheckedCocktailHour] = useState(userProfile.cocktail_hour);
const [checkedPhilanthropy, setCheckedPhilanthropy] = useState(userProfile.philanthropy);
const [checkedBasketball, setCheckedBasketball] = useState(userProfile.basketball);
const [checkedArt, setCheckedArt] = useState(userProfile.art);
const [checkedSpa, setCheckedSpa] = useState(userProfile.spa);
const [checkedFineDining, setCheckedFineDining] = useState(userProfile.fine_dining);
const [checkedPolo, setCheckedPolo] = useState(userProfile.polo);
const [checkedScubaDiving, setCheckedScubaDiving] = useState(userProfile.scuba_diving);
const [checkedHorsebackRiding, setCheckedHorsebackRiding] = useState(userProfile.horseback_riding);
const [checkedYoga, setCheckedYoga] = useState(userProfile.yoga);
const [checkedBoxing, setCheckedBoxing] = useState(userProfile.boxing);
const [errors, setErrors] = useState({});
const [isLoaded,setIsLoaded]=useState(false);




    useEffect(() => {

        const getUser=async()=>{
            await dispatch(authenticate());
            // await dispatch(getProfileThunk(profileId))
            setIsLoaded(true);

        }
        getUser();



    },[isLoaded])

const handleSubmit =async(e) => {
    e.preventDefault();


    setErrors({});
    const formData = new FormData();
    formData.append("user_id",sessionUser.id);
    formData.append("condo_id",sessionUser.condo_id);
    if(profileImage===""){
    formData.append("profile_img", userProfile.profile_img);}
    if(profileImage!==""){
        formData.append("profile_img", profileImage);
    }
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



    await dispatch(editUserProfileThunk(formData,profileId)).then(res=>closeModal()).then(history.push("/profile")).catch(
        async (res) => {

         console.log(res)

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
    let preview = document.getElementById("preview-image-edit-profile");
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

    return(<>
        <p>Update information</p>
        <form className="edit-user-profile-form" onSubmit={handleSubmit}>
    <label>
        Set profile image
        <input
        id="user-profile-image-edit-page"
          type="file"
          accept="image/*"

          onChange={(e)=>{previewFile(e)}}
        />

      </label>
      <img id="preview-image-edit-profile" src={`${userProfile.profile_img}`} height="100px" width="100px" alt="Image preview..."></img>


      <label>
      <img src={ageIcon} id="edit-user-profile-logos"/>

      Age:
      <input id="age-edit-user-profile"
                  type="text"
                  value={usersAge}
                  onChange={(e) => setUsersAge(e.target.value)}
                  required
                />
    </label>
      <label >
      <img src={workLogo} id="edit-user-profile-logos"/>
        Work
        <input id="work-edit-user-profile"
                  type="text"
                  value={work}
                  onChange={(e) => setWork(e.target.value)}
                  required
                />
      </label>
      <label>
      <img src={educationLogo} id="edit-user-profile-logos"/>
        Education
        <input id="education-edit-user-profile"
                  type="text"
                  value={education}
                  onChange={(e) => setEducation(e.target.value)}
                  required
                />

      </label>
      <label>
      <img src={homeIcon} id="edit-user-profile-logos"/>
        Hometown
        <input id="hometown-edit-user-profile"
                  type="text"
                  value={hometown}
                  onChange={(e) => setHometown(e.target.value)}
                  required
                />
      </label>

      <img src={activityLogo} id="edit-user-profile-logos"/>
        <p>Interests:</p>
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

      <input value = {checkedArt} type = "checkbox" onChange = {handleChangeArt} checked={checkedArt}/>
      </label>
      <label>
        Spa
      <input value = {checkedSpa} type = "checkbox" onChange = {handleChangeSpa} checked={checkedSpa}/>
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
      <input value = {checkedYoga} type = "checkbox" onChange = {handleChangeYoga} checked={checkedYoga}/>
      </label>
      <label>
        Boxing
      <input value = {checkedBoxing} type = "checkbox" onChange = {handleChangeBoxing} checked={checkedBoxing} />
      </label>
      <button id="submit-for-create-user-profile" type="submit" >Update profile</button>
      </form>

</>
    )
}

export default EditUserProfileModal;
