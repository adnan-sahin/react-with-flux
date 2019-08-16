import React, { useState, useEffect } from 'react';
// import { Prompt } from 'react-router-dom';
import CourseForm from './CourseForm';
import courseStore from '../stores/courseStore';
import * as courseActions from '../actions/courseActions';
import { toast } from 'react-toastify';

const ManageCoursePage = props => {
  const [errors, setErrors] = useState({});
  const [courses, setCourses] = useState(courseStore.getCourses());
  const [course, setCourse] = useState({
    id: null,
    slug: '',
    title: '',
    authorId: null,
    category: ''
  });

  useEffect(() => {
    const slug = props.match.params.slug; //from the path '/courses/:slug'
    courseStore.addChangeListener(onChange);
    if (courses.length === 0) courseActions.loadCourses();
    else if (slug) {
      setCourse(courseStore.getCourseBySlug(slug));
    }
    return () => courseStore.removeChangeListener(onChange);
  }, [courses.length, props.match.params.slug]);

  function onChange() {
    setCourses(courseStore.getCourses);
  }

  function handleChange(event) {
    const { target } = event;
    const updatedCourse = { ...course, [target.name]: target.value };
    setCourse(updatedCourse);
  }

  function formIsValid() {
    const _errors = {};

    if (!course.title) _errors.title = 'Title is required';
    if (!course.authorId) _errors.authorId = 'Author is required';
    if (!course.category) _errors.category = 'Category is required';
    setErrors(_errors);
    debugger;
    return Object.keys(_errors).length === 0;
  }

  function handleSubmit(event) {
    event.preventDefault();
    if (!formIsValid()) return;
    courseActions.saveCourse(course).then(() => {
      props.history.push('/courses');
      toast.success('Course is saved successfully.');
    });
  }

  return (
    <>
      <h2>Manage Course</h2>
      {/* <Prompt when={true} message='Are you sure you want to leave?' /> */}
      <CourseForm course={course} errors={errors} onChange={handleChange} onSubmit={handleSubmit} />
      {props.match.params.slug}
    </>
  );
};

export default ManageCoursePage;
