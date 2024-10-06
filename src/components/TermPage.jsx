import { useEffect, useState } from 'react';
import CourseList from './CourseList';
import TermSelector from './TermSelector';
import './TermPage.css';
import { useJsonQuery } from '../utilities/fetch';

const TermPage = () => {
  const {
    data: schedule,
    isLoading,
  } = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");
  const courses = schedule?.courses;
  const [term, setTerm] = useState("Fall");
  const [courseSelected, setCourseSelected] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  useEffect(() => { setCourseSelected([]); }, [term, courses]);

  if (isLoading) return "Loading...";
  if (!schedule) return "Data unavailble";
  return (
    <>
      <div className="btn-container">
        <TermSelector term={term} setTerm={setTerm}/>
        <button className="cp-button" onClick={() => setModalOpen(true)}>
          Course Plan
        </button>
      </div>
      <CourseList
        courses={courses}
        term={term}
        setSelected={(code, sel) => sel
          ? setCourseSelected(s => [...s, code])
          : setCourseSelected(s => s.filter(e => e !== code))}
        selected={courseSelected}
      />
      {modalOpen &&
        <div className="cp-modal-bg" onClick={() => setModalOpen(false)}>
          <div className="cp-modal" onClick={evt => evt.stopPropagation()}>
            {courseSelected.length
              ? <>
                  <table className="cp-table">
                    <thead>
                      <tr>
                        <th>Number</th>
                        <th>Title</th>
                        <th>Meeting time</th>
                      </tr>
                    </thead>
                    <tbody>
                      {courseSelected.map(code =>
                        <tr key={code}>
                          <td>{code}</td>
                          <td>{courses[code].title}</td>
                          <td>{courses[code].meets}</td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </>
              : <>
                  <h2>No courses selected.</h2>
                  <p>Try to pick some courses by clicking on the course card!</p>
                </>}
            <div className="cp-close-btn" onClick={() => setModalOpen(false)}>
              ❌
            </div>
          </div>
        </div>}
    </>
  );
}

export default TermPage;