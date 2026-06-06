import { useEffect, useState } from "react";
import axios from "axios";

export function CourseList() {
  const [course, setCourses] = useState();
  const [loading, isLoading] = useState(true);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/courses`,
      );

      console.log(response.data);
      setCourses(response.data);
    } catch (err) {
      console.error(err);
    }
  };

  return <></>;
}
