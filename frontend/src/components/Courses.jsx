// import React from 'react';

// function Courses() {
//   return (
//     <div>
//       <h1>Courses Page</h1>
//       <p>List of all available courses will be displayed here.</p>
//     </div>
//   );
// }

// export default Courses;



// src/App.js
import React, { useState } from 'react';


import CourseList from './CourseList';
import CourseForm from './CourseForm';

const App = () => {
  const [update, setUpdate] = useState(false);

  // Function to trigger an update in the CourseList component
  const handleCourseAdded = () => {
    setUpdate(!update);
  };

  return (
    <div className="App">
      <h1>Course Management</h1>
      <CourseForm onAddCourse={handleCourseAdded} />
      <CourseList key={update} />
    </div>
  );
};

export default App;
