import './CourseList.css';

const CourseList = ({ courses, term, selected, setSelected }) => {
  return (
    <div className="cl-container">
      {Object.entries(courses).filter(
        ([code, detail]) => !term || detail.term === term
      ).map(([code, detail]) =>
        <div
          key={code}
          className={"cl-card" + (selected.includes(code) ? " selected" : "")}
          onClick={() => setSelected(code, !selected.includes(code))}
        >
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