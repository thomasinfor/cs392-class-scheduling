import { useState } from 'react';
import CourseList from './CourseList';
import TermSelector from './TermSelector';

const TermPage = ({ courses }) => {
  const [term, setTerm] = useState("Fall");

  return (
    <>
      <TermSelector term={term} setTerm={setTerm}/>
      <CourseList courses={courses} term={term}/>
    </>
  );
}

export default TermPage;