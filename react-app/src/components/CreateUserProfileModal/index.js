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
const [profileImage, setProfileImage]=useState("");
const [dateOfBirth,setDateOfBirth]=useState("2024-01-01");
const [usersAge,setUsersAge]=useState("");

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


	return (
		<div>
            <h1>Create your profile!</h1>
<form className="create-user-profile-form">
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
        <input type="date" id="age" name="age" value={dateOfBirth} min="1920-01-01" max="2024-01-01" onChange={(e)=>setDateOfBirth(e.target.value)}/>
      </label>
      <p>Age : {usersAge}</p>
      <label>
      <img src={workLogo} id="create-user-profile-logos"/>
        Work
      </label>
      <label>
      <img src={educationLogo} id="create-user-profile-logos"/>
        Education

      </label>
      <label>
      <img src={homeIcon} id="create-user-profile-logos"/>
        Hometown
      </label>
      <label>
      <img src={activityLogo} id="create-user-profile-logos"/>
        Interests:
      </label>
      </form>





        </div>
	);
}

export default CreateUserProfileModal;

// const str_op = now.getFullYear() + '-' +(now.getMonth()+1) + '-' + now.getDate();
