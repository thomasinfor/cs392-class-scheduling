import './CourseList.css';

const CourseList = ({ courses }) => {
  return (
    <div className="container">
      {Object.entries(courses).map(([code, detail]) =>
        <div className="card" key={code}>
          <h3 className="code">{detail.term} CS {detail.number}</h3>
          <div className="title">{detail.title}</div>
          <hr className="divider"/>
          <div className="time">{detail.meets}</div>
        </div>
      )}
    </div>
  );
}

export default CourseList;