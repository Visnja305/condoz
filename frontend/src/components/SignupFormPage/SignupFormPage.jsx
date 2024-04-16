import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate,useParams } from "react-router-dom";
import { signUp } from "../../store/session";
import './SignupForm.css';
import validator from "validator";

function SignupFormPage() {
  const dispatch = useDispatch();
  const { condoId } = useParams();

  const sessionUser = useSelector((state) => state.session.user);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // const [type,setType]=useState("")
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);

  if (sessionUser) { return <Navigate to="/profile" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!validator.isEmail(email)) {
      setErrors(["Please, enter valid Email!"]);
    }
    else{
    if (password === confirmPassword) {

      const first_name=firstName;
      const last_name=lastName;
      const condo_id=condoId;

      // const data= await dispatch(signUp(first_name,last_name,type,condo_id, email, password))

      const data= await dispatch(signUp(first_name,last_name,condo_id, email, password))
        if (data) {
          setErrors(data)
        }
    } else {
        setErrors(['Confirm Password field must be the same as the Password field']);
    }
  }};

  return (
    <>
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <ul>
          {errors.map((error, idx) => <li key={idx}>{error}</li>)}
        </ul>
        <label>
          Email
          <input
            type="text"
            value={email}
            onChange={(e) =>{setEmail(e.target.value)}}
            required
          />
        </label>


        <label>
          First Name
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </label>


        <label>
          Last Name
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </label>


        {/* <label>
      Type:
      <select className="signup-form-input-select"
          name="type"
          id="type"
          onChange={(e) => setType(e.target.value)}>
        <option value="">--Please choose an option--</option>
        <option value="tenant">Tenant</option>
        <option value="property-management">Property management</option>

      </select>
    </label> */}


        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </label>


        <label>
          Confirm Password
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </label>

        <button type="submit">Sign Up</button>
      </form>
    </>
  );
}

export default SignupFormPage;
