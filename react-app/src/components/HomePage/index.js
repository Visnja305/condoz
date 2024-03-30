import React, { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import "./HomePage.css"
import {useLocation} from "react-router-dom";
import { getCondosThunk } from "../../store/condos";
import { Link } from "react-router-dom";
import logo from "../../logo/transparent.png"

// import {AnimatePresence, motion} from "framer-motion/dist/framer-motion"
import { motion, AnimatePresence } from "framer-motion"
function HomePage(){
    const dispatch = useDispatch();

    const [isHovering, setIsHovering] = useState(false);
    const [isClicked,setIsClicked]=useState(false)


 useEffect(() => {
      dispatch(getCondosThunk())

    }, [dispatch]);
    const condos = Object.values(useSelector((state) => state.condos));

    const handleMouseOver = () => {
        setIsHovering(true);
      };

      const handleMouseOut = () => {
        setIsHovering(false);
      };
const onClick=()=>{

  setIsClicked(true)

}
const location=useLocation()


    return (

<AnimatePresence >
      <motion.div key={location.pathname} animate={{
      scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],
    }}
    exit={{  scale: [1, 2, 2, 1, 1],
      rotate: [0, 0, 270, 270, 0],
      borderRadius: ["20%", "20%", "50%", "50%", "20%"],}}
      transition={{duration:2}}
    className="home-page-container">
<img src={logo} id="website-logo" onMouseOver={handleMouseOver}
          />
          <div className="home-page-condos-container">
          {isHovering  && <div><p>Choose your building and login/sign up!</p>
          {(
          condos.map((condo) =>

          <div key={condo.id} className="imgLink">




  <Link to={`/condos/${condo.id}`}><img id="condo-image" src={condo.main_image} style={{filter: "sepia(70%)"}}/> </Link>


          </div>

        )
        )}</div>}
        </div>
      </motion.div>

      </AnimatePresence>

    );
}

export default HomePage;

{/* <a href={`/condos/${condo.id}`} onClick={(e)=>{setShow(!show); return false;}}> <img id="condo-image" src={condo.main_image} style={{filter: "sepia(70%)"}}/></a> */}
{/* <button onClick={onClick}> <img id="condo-image" src={condo.main_image} style={{filter: "sepia(70%)"}}/></button> */}
{/* <img key={condo.main_image} initial={false}  exit={{opacity:0,transition:{duration:3}}} id="condo-image" src={condo.main_image} style={{filter: "sepia(70%)"}}/> </motion.button> */}
