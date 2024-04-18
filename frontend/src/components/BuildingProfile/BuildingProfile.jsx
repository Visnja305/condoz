import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams,Navigate,useNavigate} from "react-router-dom";
import { authenticate } from "../../store/session";
import { getCondosThunk } from "../../store/condos";
import "./BuildingProfile.css"
import { login } from "../../store/session";
import validator from "validator";



function BuildingProfile(){
    const {condoId}=useParams();
    console.log("RRRRRRRRRRRRRRRRRRRRRRRRRRR",import.meta.env)
    // let history=useHistory();
    const navigate = useNavigate();

    const dispatch = useDispatch();

    const sessionUser = useSelector((state) => state.session.user);
    const condos = Object.values(useSelector((state) => state.condos));

    const theCondo=condos.filter((condo)=>Number(condo.id)===Number(condoId))[0]
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errors, setErrors] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [message, setMessage] = useState("");






    useEffect(() => {


      dispatch(getCondosThunk()).then(dispatch(authenticate())).then(() => setIsLoaded(true));
    }, [dispatch]);
    if (sessionUser) {return <Navigate to="/profile" />}


    const handleSubmit = async (e) => {
      e.preventDefault();
      if(!validator.isEmail(email)) {
        setMessage("Please, enter valid Email!");
      }
      else{
        setMessage("");

      const data = await dispatch(login(email, password));
      if (data) {
        setErrors(data);
      }
    }
    };
    const onDemoUser = async (e) => {
      e.preventDefault();
      const data = await dispatch(login("demo@aa.io", "password"));
      if (data) {
        setErrors(data);
      }
    };

// const handleSignOut=(e)=>{
//     // <Navigate to={`/${condoId}/signup`}/>
//    navigate('{`/${condoId}/signup`}');
// }


    return (
<div className="building-profile-base">
     {theCondo && isLoaded && ( <div className="enter-building-profile" >
      <h2>{theCondo.name}</h2>
     <form onSubmit={handleSubmit} className="enter-building-profile-form">
        <ul>
          {errors.map((error, idx) => (
            <li key={`${idx}-${new Date().getTime()}`}>{error}</li>
          ))}
        </ul>
        <p>{message}</p>
        <div className="login-form-container">

          <input
            type="text"
            value={email}
            onChange={(e) =>setEmail(e.target.value)}
            required
            id="email-login-input"
          />

          <label>
          Email
        </label>
</div>
<div className="login-form-container">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            id="password-login-input"

          />

       <label>Password</label>
       </div>
        <button type="submit" id="login-button" disabled={email.length == 0 || password.length == 0}>Log In</button>

      </form>
      <button onClick={(e)=>onDemoUser(e)} className="demo-user-btn"> Demo User</button>
      <span>Not a member?  <button id="signup-button-login-page" onClick={()=>navigate(`/${condoId}/signup`)}>Sign up</button></span>


      </div>
    )

    }
</div>
    )
}

export default BuildingProfile;

//  <div className="enter-building-profile" style={{backgroundImage:`url(${theCondo.main_image})`}}></div>

// if (sessionUser) {return <Redirect to={`/profile/${sessionUser.id}`} />}
