import React from "react";
import Elearnlogo from "../assets/logo.png";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Button } from "@mui/material";


export function NavBar() {
  const navigate = useNavigate();

  function handleClick() {
    navigate("/create");
  }

  return (
    <>
      <nav>
        <div className="NavbarSection">
        
            <img src={Elearnlogo} alt="logo" />
          
          

          <Link to="/homePage">HomePage</Link>
          <Link to="/courses">Courses</Link>
          <Link to="/learning">My Learning</Link>
          <Link to="/instructor">Instructor</Link>
          <Button variant="outlined" onClick={handleClick}>Create Course</Button>
         
      
      
        </div>
      </nav>
    </>
  );
}
