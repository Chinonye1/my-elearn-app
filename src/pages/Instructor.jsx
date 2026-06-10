import { Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';


function createData(courseTitle, category, students, revenues, rating) {
  return {courseTitle, category, students, revenues, rating };
}

const rows = [
  createData('Complete React Development Course', "Programming", 1.235, "$10500", 4.0),
  createData('Advanced JavaScript Mastery', "Programming", 856, "$7500", 4.3),
  createData('Python for Data Science', "Date Science", 2.103, "$4500", 6.0),
  createData('UI/UX Design Fundamentals', "Design",456 , "$2500", 4.3),
  createData('Machine Learning', "Machine", 321, "$3500", 3.9),
];

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

        <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell> Course Title </TableCell>
            <TableCell align="right">Category</TableCell>
            <TableCell align="right">Student</TableCell>
            <TableCell align="right">Revenue&nbsp;($)</TableCell>
            <TableCell align="right">Rating</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.courseTitle}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.courseTitle}
              </TableCell>
              <TableCell align="right">{row.category}</TableCell>
              <TableCell align="right">{row.students}</TableCell>
              <TableCell align="right">{row.revenues}</TableCell>
              <TableCell align="right">{row.rating}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
        </>
    )
    
}
