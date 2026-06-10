import { useEffect, useState } from "react"
import axios from "axios"


export function SearchCourses() {

    const [filterCourses, setFilterCourses]= useState([])

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







    return (
        <>
        
        
        </>
    )
    
}