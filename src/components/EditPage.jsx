import './EditPage.css';
import { useParams, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { validMeet } from '../utilities/schedule';
import { useDbData, useDbUpdate } from '../utilities/firebase';

const EditPage = () => {
  const { code } = useParams();
  const [course, error] = useDbData(`/courses/${code}`, { sync: false });
  const [update, result] = useDbUpdate(`/courses/${code}`);
  const [title, setTitle] = useState("");
  const [meets, setMeets] = useState("");
  const titleError = title.length < 2;
  const meetsError = !validMeet(meets);

  useEffect(() => {
    if (course) {
      setTitle(course.title);
      setMeets(course.meets);
    }
  }, [course]);
  useEffect(() => {
    if (result?.error) {
      window.alert(result.message);
    } else {
      if (result?.timestamp) {
        window.alert(result.message);
        window.location.reload();
      }
    }
  }, [result]);

  if (error || course === null) return "Data unavailble";
  if (!course) return "Loading...";
  return (
    <form className="edit-container" onSubmit={evt => {
      evt.preventDefault();
      update({
        ...course,
        title, meets
      });
    }}>
      <label className="edit-label">
        Title
        {titleError && <span className="edit-errormsg">Must be at least two characters</span>}
      </label>
      <input
        className="edit-input"
        value={title}
        onChange={evt => setTitle(evt.target.value)}
      />
      <label className="edit-label">
        Meets
        {meetsError && <span className="edit-errormsg">Must contain days and start-end, e.g., MWF 12:00-13:20</span>}
      </label>
      <input
        className="edit-input"
        value={meets}
        onChange={evt => setMeets(evt.target.value)}
      />
      <div>
        <Link to="/"><button>Cancel</button></Link>
        &nbsp;&nbsp;&nbsp;
        <input type="submit" disabled={titleError || meetsError}/>
      </div>
    </form>
  );
}

export default EditPage;