import React, { useState, useEffect } from 'react';
import './App.css';

const EducationPlanner = () => {
  const [subjects, setSubjects] = useState([]);
  const [subjectName, setSubjectName] = useState('');
  const [studyHours, setStudyHours] = useState({});
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    // Retrieve data from local storage on page load
    const storedSubjects = JSON.parse(localStorage.getItem('subjects')) || [];
    setSubjects(storedSubjects);

    const storedStudyHours = JSON.parse(localStorage.getItem('studyHours')) || {};
    setStudyHours(storedStudyHours);

    calculateTotalHours(storedStudyHours);
  }, []);

  const addSubject = () => {
    if (subjectName.trim() === '') return;

    const newSubjects = [...subjects, subjectName];
    setSubjects(newSubjects);
    setSubjectName('');

    const newStudyHours = { ...studyHours, [subjectName]: 0 };
    setStudyHours(newStudyHours);

    // Save data to local storage
    localStorage.setItem('subjects', JSON.stringify(newSubjects));
    localStorage.setItem('studyHours', JSON.stringify(newStudyHours));

    calculateTotalHours(newStudyHours);
  };

  const adjustStudyHours = (subject, adjustment) => {
    const newStudyHours = { ...studyHours, [subject]: studyHours[subject] + adjustment };
    setStudyHours(newStudyHours);

    // Save data to local storage
    localStorage.setItem('studyHours', JSON.stringify(newStudyHours));

    calculateTotalHours(newStudyHours);
  };

  const calculateTotalHours = (hours) => {
    const total = Object.values(hours).reduce((acc, curr) => acc + curr, 0);
    setTotalHours(total);
  };

  return (
    <div className="education-planner">
      <h1>Education Planner</h1>
      <div className='div-main'>
        <label className='sub'>
          Subject Name:
          <input
            className='Input'
            type="text"
            value={subjectName}
            onChange={(e) => setSubjectName(e.target.value)}
          />
        </label>
        <button onClick={addSubject} className='btn'>Add Subject</button>
      </div>
      <div className="subjects-list">
        <h2>SUBJECTS</h2>
        <ul>
          {subjects.map((subject) => (
            <li key={subject}>
              {subject} - {studyHours[subject]} hours
              <button className='btn-add' onClick={() => adjustStudyHours(subject, 1)}>+</button>
              <button className='btn-sub' onClick={() => adjustStudyHours(subject, -1)}>-</button>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h2>Total Study Hours: {totalHours} hours</h2>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <EducationPlanner />
    </div>
  );
}

export default App;
