// src/services/courseService.js
import axios from 'axios';
import API from '../api';
// Base URL of the Django API
const API_URL = 'http://localhost:8000/api/course-list/';

// Function to get all courses
export const getCourses = async () => {
  try {
    const response = await API.get("/api/course-list/");
    return response.data;
  } catch (error) {
    console.error('Error fetching courses:', error);
  }
};

// Function to create a new course
export const createCourse = async (courseData) => {
  try {
    const response = await API.post('/api/course-list/', courseData);
    return response.data;
  } catch (error) {
    console.error('Error creating course:', error);
  }
};

// Function to delete a course
export const deleteCourse = async (id) => {
  try {
    await API.delete(`/api/course-list/${id}/`);
  } catch (error) {
    console.error('Error deleting course:', error);
  }
};
