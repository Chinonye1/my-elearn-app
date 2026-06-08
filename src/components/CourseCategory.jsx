import { useEffect, useState } from "react";
import axios from "axios";

export function CourseCategory() {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  async function getData() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_SERVER_URL}/courses`,
      );

      setCourses(response.data);

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  }

  if (loading) return <h3>Loading categories...</h3>;

  const groupedCourses = courses.reduce((groups, course) => {
    const categoryName = course.category?.trim() || "Uncategorized";

    if (!groups[categoryName]) {
      groups[categoryName] = [];
    }

    groups[categoryName].push(course);
    return groups;
  }, {});

  const categoryNames = Object.keys(groupedCourses).sort();

  return (
    <div className="categoryGroups">
      {categoryNames.map((categoryName) => {
        const isActive = categoryName === activeCategory;

        return (
          <section
            key={categoryName}
            className={`categoryCard ${isActive ? "isActive" : ""}`}
          >
            <button
              type="button"
              className="categoryCardHeader"
              onClick={() => setActiveCategory(isActive ? null : categoryName)}
            >
              <h3>{categoryName}</h3>
              <p>{groupedCourses[categoryName].length} courses</p>
            </button>

            {isActive && (
              <div className="categoryCourses">
                {groupedCourses[categoryName].map((course) => {
                  return (
                    <article key={course.id} className="categoryCourseCard">
                      <img src={course.image} alt={course.title} />
                      <p>{course.title}</p>
                      <h4>{course.tutorName}</h4>
                      <p>{course.duration}</p>
                      <p>{course.price}</p>
                    </article>
                  );
                })}
              </div>
            )}
          </section>
        );
      })}
    </div>
  );
}
