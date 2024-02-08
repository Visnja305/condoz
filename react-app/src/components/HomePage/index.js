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
      <div className="home-page-container">
<img src={logo} id="website-logo" onMouseOver={handleMouseOver}
          />
          <div className="home-page-condos-container">
          {isHovering && (
          condos.map((condo) =>

          <div key={condo.id} className="imgLink">
            <Link to={`/condos/${condo.id}`}> <img id="condo-image" src={condo.main_image} style={{filter: "sepia(70%)"}}/></Link>



          </div>
        )
        )}
        </div>
      </div>
    );
}

export default HomePage;
