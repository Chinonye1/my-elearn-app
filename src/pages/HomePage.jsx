import {Button} from "../components/Button"
import Elearnlogo from "../assets/logo.png";
import { CourseList } from "../components/CourseList";




export function HomePage() {


    function handleClick(){
        return <CourseList/>
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

        <div className="buttons">
            
            <Button buttonName={"Get Started"}/>
            <Button buttonName={"Teach on Elearn"}/>
           
      
         </div>
        </div>
    
    
    </>
    
}