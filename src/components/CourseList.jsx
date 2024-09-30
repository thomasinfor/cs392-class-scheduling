import './CourseList.css';

const CourseList = ({ courses, term }) => {
  return (
    <div className="cl-container">
      {Object.entries(courses).filter(
        ([code, detail]) => !term || detail.term === term
      ).map(([code, detail]) =>
        <div className="cl-card" key={code}>
          <h3 className="cl-code">{detail.term} CS {detail.number}</h3>
          <div className="cl-title">{detail.title}</div>
          <hr className="cl-divider"/>
          <div className="cl-time">{detail.meets}</div>
        </div>
      )}
    </div>
  );
}

export default CourseList;