import { useEffect, useState } from "react";
import axios from "axios";

export function Learning() {

    const [myCourses, setMyCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/courses`,
      );

      setMyCourses(response.data);

      setLoading(false);
    } catch (err) {
      console.error(err);
    }
  }

  if (loading) return <h3>Loading courses...</h3>;





    return (
        <>
        <h1>My Learning</h1>
        <p>Track your progress and continue learning</p>

        

        <section className="performanceCard">
            <div>
                <p>Hours Learned</p>
                <h1>40</h1>
            </div>
            <div>
                <p>Courses Enrolled</p>
                 <h1>3</h1>
            </div>
            <div>
                <p>Certificates</p>
                 <h1>3</h1>
            </div>
            <div>
                <p>Day Steak</p>
                 <h1>7</h1>
            </div>

             {/* <div className="courseListCard">
        {myCourses.map((course) => {
          return (
            <div key={course.id}>
              <img src={course.image} />
              <h5>{course.category}</h5>
              <p> {course.title} </p>
              <h4>{course.tutorName}</h4>
              <h5>{course.price}</h5>
              <p>{course.duration}</p>
            
            </div>
          );
        })}
      </div> */}

     


            




        </section>

      <div className="myLearn">
        <div>
        <img src={myCourses[0].image}/>
        </div>
         
          <div className="myLearn">
            <h4>{myCourses[0].category}</h4>

        
        <h3>{myCourses[1].title}</h3>
        {myCourses[0].tutorName}

         </div>
         </div>

         <div className="myLearn">
        <div>
        <img src={myCourses[1].image}/>
        </div>
         
          <div className="myLearn">
            <h4>{myCourses[1].category}</h4>

        
        <h3>{myCourses[1].title}</h3>
        {myCourses[1].tutorName}

         </div>
         </div>

        

        
        </>
    )
    
}