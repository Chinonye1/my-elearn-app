import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";


export function Instructor() {
    const navigate = useNavigate();

    function handleCreateCourse() {
        navigate("/create");
    }

    return (
        <>
        <div>
            <div>
        <h1>Instructor Dashboard</h1>
        <p>Manage your courses and Track your Performance</p>
        </div>
        <div>
            <Button variant="contained" onClick={handleCreateCourse}>Create course</Button>
        


        </div>
        </div>

        

        <section className="performanceCard">
            <div>
                <p>Total Courses</p>
                <h1>4</h1>
            </div>
            <div>
                <p>Total Students</p>
                 <h1>4,625</h1>
            </div>
            <div>
                <p>Total Revenues</p>
                 <h1>$46,250</h1>
            </div>
            <div>
                <p>Published</p>
                 <h1>3</h1>
            </div>


            




        </section>
        </>
    )
    
}
