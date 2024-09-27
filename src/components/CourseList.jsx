const CourseList = ({ courses }) => {
  return Object.entries(courses).map(([code, detail]) =>
    <p key={code}>{detail.term} CS {detail.number}: {detail.title}</p>
  );
}

export default CourseList;