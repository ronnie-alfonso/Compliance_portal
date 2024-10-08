// src/components/CourseList.js
import React, { useEffect, useState } from 'react';
import { getCourses, deleteCourse } from '../services/courseService';

const CourseList = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetchCourses();
    
  }, [courses]);

  const fetchCourses = async () => {
    const data = await getCourses();
    setCourses(data);
  };

  const handleDelete = async (id) => {
    await deleteCourse(id);
    fetchCourses();
  };

  return (
    <div>
      <h2>Course List</h2>
      <ul>
        {courses.map((course) => (
          <li key={course.id}>
            {course.course_name} - {course.description}
            <button onClick={() => handleDelete(course.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CourseList;
