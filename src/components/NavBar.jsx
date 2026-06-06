import React from "react";
import Elearnlogo from "./images/Elearnlogo.png";


export function NavBar({Button}) {
  return (
    <>
      <nav>
        <div className="NavbarSection">
          <img src={Elearnlogo} alt="logo" />
          <p>ELearnCafe</p>
          <a href="/"></a>
          <a href="/home">Home</a>
          <a href="/courses">Courses</a>
          <a href="/category">Category</a>
          <a href="/about">About</a>
        </div>
        <div className="intro">
        <div>
        <h1>Learn Today,</h1>
        <h1>Lead Tomorrow</h1>
        <p>
          Discover expert-led courses in technology, business, design, and
          personal development. Learn at your own pace, build practical skills,
          and take the next step in your career.
        </p>
        </div>
        <div>
             <img src={Elearnlogo} alt="logo" />
            
        </div>
        </div>
        <div className="buttons">
           
      
         </div>
      </nav>
    </>
  );
}
