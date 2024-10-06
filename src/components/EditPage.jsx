import './EditPage.css';
import { useJsonQuery } from '../utilities/fetch';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';

const EditPage = () => {
  const {
    data: schedule,
    isLoading,
  } = useJsonQuery("https://courses.cs.northwestern.edu/394/guides/data/cs-courses.php");
  const courses = schedule?.courses;
  const { code } = useParams();
  const [title, setTitle] = useState("");
  const [meets, setMeets] = useState("");

  useEffect(() => {
    if (courses?.[code]) {
      setTitle(courses[code].title);
      setMeets(courses[code].meets);
    }
  }, [schedule]);

  if (isLoading) return "Loading...";
  if (!schedule || !courses[code])
    return "Data unavailble";
  return (
    <form className="edit-container">
      <label className="edit-label">Title</label>
      <input
        className="edit-input"
        value={title}
        onChange={evt => setTitle(evt.target.value)}
      />
      <label className="edit-label">Meets</label>
      <input
        className="edit-input"
        value={meets}
        onChange={evt => setMeets(evt.target.value)}
      />
      <div>
        <Link to="/"><button>Cancel</button></Link>
        &nbsp;&nbsp;&nbsp;
        <input type="submit"/>
      </div>
    </form>
  );
}

export default EditPage;