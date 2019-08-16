import React, { useState, useEffect } from 'react';
import courseStore from '../stores/courseStore';
import * as courseActions from '../actions/courseActions';
import CourseList from './CourseList';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

function CoursesPage() {
  const [courses, setCourses] = useState(courseStore.getCourses());

  useEffect(() => {
    courseStore.addChangeListener(onChange);
    if (courseStore.getCourses().length === 0) courseActions.loadCourses();
    return () => courseStore.removeChangeListener(onChange);
  }, []);

  function onChange() {
    setCourses(courseStore.getCourses());
  }

  function deleteItem() {
    courseActions.deleteCourse.then(() => toast.error('Course is deleted successfully.'));
  }

  return (
    <>
      <h2>Courses</h2>
      <Link className='btn btn-primary' to='/course'>
        Add Course
      </Link>
      <CourseList courses={courses} deleteCourse={deleteItem} />
    </>
  );
}

export default CoursesPage;
