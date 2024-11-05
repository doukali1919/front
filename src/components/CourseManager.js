import React, { useEffect, useState } from 'react';
import axios from 'axios';

// Set the base URL for the API
const API_URL = 'http://localhost:8089/api/course';

const CourseManager = () => {
    const [courses, setCourses] = useState([]);
    const [newCourse, setNewCourse] = useState({
        level: '',
        typeCourse: '',
        support: '',
        price: '',
        timeSlot: ''
    });

    // Function to fetch courses
    const fetchCourses = async () => {
        try {
            const response = await axios.get(`${API_URL}/all`);
            console.log('Courses fetched successfully:', response.data);
            setCourses(response.data); // Update state with fetched courses
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    // Function to add a new course
    const addCourse = async (courseData) => {
        try {
            const response = await axios.post(`${API_URL}/add`, courseData);
            console.log('Course added successfully:', response.data);
            fetchCourses(); // Refresh the course list after adding
        } catch (error) {
            console.error('Error adding course:', error);
        }
    };

    // Use effect to fetch courses on component mount
    useEffect(() => {
        fetchCourses();
    }, []);

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        addCourse(newCourse);
        setNewCourse({
            level: '',
            typeCourse: '',
            support: '',
            price: '',
            timeSlot: ''
        }); // Reset form fields
    };

    return (
        <div>
            <h1>Course Manager</h1>
            <form onSubmit={handleSubmit}>
                <input
                    type="number"
                    placeholder="Level"
                    value={newCourse.level}
                    onChange={(e) => setNewCourse({ ...newCourse, level: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Type Course"
                    value={newCourse.typeCourse}
                    onChange={(e) => setNewCourse({ ...newCourse, typeCourse: e.target.value })}
                    required
                />
                <input
                    type="text"
                    placeholder="Support"
                    value={newCourse.support}
                    onChange={(e) => setNewCourse({ ...newCourse, support: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Price"
                    value={newCourse.price}
                    onChange={(e) => setNewCourse({ ...newCourse, price: e.target.value })}
                    required
                />
                <input
                    type="number"
                    placeholder="Time Slot"
                    value={newCourse.timeSlot}
                    onChange={(e) => setNewCourse({ ...newCourse, timeSlot: e.target.value })}
                    required
                />
                <button type="submit">Add Course</button>
            </form>

            <h2>Courses List</h2>
            <ul>
                {courses.map((course) => (
                    <li key={course.numCourse}>
                        Level: {course.level}, Type: {course.typeCourse}, Support: {course.support}, Price: {course.price}, Time Slot: {course.timeSlot}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default CourseManager;
