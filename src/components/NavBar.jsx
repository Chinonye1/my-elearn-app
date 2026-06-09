import React from "react";
import Elearnlogo from "../assets/logo.png";
import { Link } from "react-router-dom";



export function NavBar() {
  return (
    <>
      <nav>
        <div className="NavbarSection">

          <p>
          <img  src={Elearnlogo}  alt="logo" />
          ELearnCafe</p>
          
          <Link to="/homePage">HomePage</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/mylearning">My Learning</Link>
          <Link to="/instructor">Instructor</Link>
        </div>
     
      </nav>
    </>
  );
}
