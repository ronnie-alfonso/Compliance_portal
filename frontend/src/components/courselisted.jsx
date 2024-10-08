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
    
        {courses.map((course) => (
          <p key={course.id}>
            {course.course_name}
          </p>
        ))}
 
    </div>
  );
};

export default CourseList;
