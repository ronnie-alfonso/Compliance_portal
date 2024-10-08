// src/components/CourseForm.js
import React, { useState } from 'react';
import { createCourse } from '../services/courseService';


const CourseForm = ({ onAddCourse }) => {
  const [addcourse, setaddcourse] = useState({
    course_name: '',
    description: '',
    image: '',
    pdf_name: '',
  })

 const handleChange = (e) => {
   const {name, value} = e.target
   setaddcourse((prev)=>({
    ...prev,[name]:value

   }))

 }
  
  const handleSubmit = async (e) => {
    e.preventDefault();
   console.log(addcourse);
   createCourse(addcourse);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Course Name</label>
        <input
          type="text"
          name="course_name"
          value={addcourse.course_name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Description</label>
        <textarea
          name='description'
          value={addcourse.description}
          onChange={handleChange}
        ></textarea>
      </div>
      <div>
        <label>Image</label>
        <input
         name='image'
          type="text"
          value={addcourse.image}
          onChange={handleChange}
        />
      </div>
      <div>
      <label>pdf_name</label>
        <input type="text" 
          name='pdf_name'
          value={addcourse.pdf_name}
          onChange={handleChange}
       />
      </div>
      <button type="submit">Add Course</button>
    </form>
  );
};

export default CourseForm;
