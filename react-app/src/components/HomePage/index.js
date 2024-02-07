import React, { useEffect,useState } from "react";
import { useDispatch,useSelector } from "react-redux";
import "./HomePage.css"
import { getCondosThunk } from "../../store/condos";
import { Link } from "react-router-dom";
import logo from "../../logo/transparent.png"

function HomePage(){
    const dispatch = useDispatch();

    const [isHovering, setIsHovering] = useState(false);
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
    return (
      <>
<img src={logo} id="website-logo" onMouseOver={handleMouseOver}
          />
          {isHovering && (
          condos.map((condo) =>

          <div key={condo.id} >
            <Link to={`/condos/${condo.id}`}> <img id="condo-image" src={condo.main_image}/></Link>


            <hr></hr>
          </div>
        )
        )}
      </>
    );
}

export default HomePage;
