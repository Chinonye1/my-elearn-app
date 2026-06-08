import { useEffect, useState } from "react"
import axios from "axios";


export function CourseCategory() {

    const [category, setCategory]= useState([])
    const [loading, setLoading] = useState(true)


   useEffect(()=>{
    getData()
   }, [])

    async function getData() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/categories`,
      );

      setCategory(response.data);

      setLoading(false);

      
    } catch (err) {
      console.error(err);
      setLoading(false);
    }

    }

    if (loading) return <h3>Loading categories...</h3>;

    return (
        <>
        {category.map((element)=>{
            return(
                <div key={element.id}>
                  <p>{element.name}</p>
                  <p>{element.id}</p>
                </div>
            )

        })}
        </>
    )
    
}