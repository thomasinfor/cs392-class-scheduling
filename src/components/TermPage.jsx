import { useEffect, useState } from 'react';
import CourseList from './CourseList';
import TermSelector from './TermSelector';

const TermPage = ({ courses }) => {
  const [term, setTerm] = useState("Fall");
  const [courseSelected, setCourseSelected] = useState([]);

  useEffect(() => { setCourseSelected([]); }, [term, courses]);

  return (
    <>
      <TermSelector term={term} setTerm={setTerm}/>
      <CourseList
        courses={courses}
        term={term}
        setSelected={(code, sel) => sel
          ? setCourseSelected(s => [...s, code])
          : setCourseSelected(s => s.filter(e => e !== code))}
        selected={courseSelected}
      />
    </>
  );
}

export default TermPage;