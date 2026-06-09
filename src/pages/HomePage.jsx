
import { Button } from "@mui/material";
import Elearnlogo from "../assets/logo.png";
import { useNavigate } from "react-router-dom";




export function HomePage() {
    const navigate = useNavigate();


    function handleClick(){
        navigate("/courses");
    }

    function handleClick2(){
        navigate("/instructor");
    }

    


    return <>

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

        <div className="buttonsList">

            
            <Button onClick={handleClick}>Get started</Button>
            <Button onClick={handleClick2}>Teach on Elearn</Button>
           
      
         </div>
        </div>
    
    
    </>
    
}
