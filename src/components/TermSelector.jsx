import './TermSelector.css';

const TermSelector = ({ term, setTerm }) => {
  return (
    <div className="term-container">
      {["Fall", "Winter", "Spring"].map(e =>
        <div key={e} onClick={() => setTerm(e)} className="term-choice">
          <input
            type="radio"
            value={e}
            checked={term === e}
            onChange={evt => setTerm(evt.target.value)}
          />
          <label> {e}</label>
        </div>
      )}
    </div>
  );
}

export default TermSelector;