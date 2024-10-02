import './CourseList.css';
import { conflict } from '../utilities/schedule';

const CourseList = ({ courses, term, selected, setSelected }) => {
  return (
    <div className="cl-container">
      {Object.entries(courses).filter(
        ([code, detail]) => !term || detail.term === term
      ).map(([code, detail]) => {
        const conflicted = selected.some(s => conflict(courses[s].meets, detail.meets));
        const picked = selected.includes(code);

        return (
          <div
            key={code}
            className={"cl-card" + (picked ? " selected" : (conflicted ? " disabled" : ""))}
            onClick={() => {
              if (picked)
                setSelected(code, !picked);
              else if (!conflicted)
                setSelected(code, !picked);
            }}
          >
            <h3 className="cl-code">{detail.term} CS {detail.number}</h3>
            <div className="cl-title">{detail.title}</div>
            <hr className="cl-divider"/>
            <div className="cl-time">{detail.meets}</div>
          </div>
        );
      })}
    </div>
  );
}

export default CourseList;