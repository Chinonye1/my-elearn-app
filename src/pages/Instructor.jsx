import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


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

        <div>
            <h1>My Courses</h1>




        </div>
        </>
    )
    
}
