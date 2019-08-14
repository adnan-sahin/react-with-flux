import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function CourseList(props) {
  const renderRow = course => {
    return (
      <tr key={course.id}>
        <td>
          <Link to={'/course/' + course.slug}>{course.title}</Link>
        </td>
        <td>{course.authorId}</td>
        <td>{course.category}</td>
      </tr>
    );
  };
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Title</th>
          <th>Author Id</th>
          <th>Category</th>
        </tr>
      </thead>
      <tbody>{props.courses.map(renderRow)}</tbody>
    </table>
  );
}

CourseList.propTypes = {
  courses: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      authorId: PropTypes.number.isRequired,
      category: PropTypes.string.isRequired
    })
  ).isRequired
};
CourseList.defaultProps = {
  courses: []
};

export default CourseList;
