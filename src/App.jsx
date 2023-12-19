import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { nanoid } from 'nanoid';
import AddStudent from './Components/AddStudent';
import _ from 'lodash';
import Student from './Components/Student';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

function App() {
  const [allStudents, setAllStudents] = useState(null);
  const [searchResults, setSearchResults] = useState(null);
  const [keywords, setKeywords] = useState(null);
  const [gradYear, setGradYear] = useState('');

  useEffect(() => {
    if (localStorage) {
      const studentsLocalStorage = JSON.parse(localStorage.getItem('students'));
      if (studentsLocalStorage) {
        saveStudents(studentsLocalStorage);
      }
      else {
        saveStudents(students);
      }

    }  

  }, []);

  const saveStudents = (students) => {
    setAllStudents(students);
    setSearchResults(students);
    if (localStorage) {
      localStorage.setItem('students', JSON.stringify(students));
      console.log('saved to local storage');
    }
  };

  const addStudent = (newStudent) => {
    const updatedStudents = [...allStudents, newStudent];
    saveStudents(updatedStudents);
  };

  const searchStudents = () => {
    let keywordsArray = [];
    if (keywords) {
      keywordsArray = keywords.toLowerCase().split(' ');
    }

    if (gradYear) {
      keywordsArray.push(gradYear.toString());
    }

    if (keywordsArray.length > 0) {
      const searchResults = allStudents.filter((student) => {
        for (const word of keywordsArray) {
          if (
            student.firstName.toLowerCase().includes(word) ||
            student.lastName.toLowerCase().includes(word) ||
            student.gradYear === parseInt(word)
          ) {
            return true;
          }
        }
        return false;
      });
      setSearchResults(searchResults);
    } else {
      setSearchResults(allStudents);
    }
  };

  const removeStudent = (studentToDelete) => {
    console.table(studentToDelete);
    const updatedStudentsArray = allStudents.filter((student) => student.id !== studentToDelete.id);
    saveStudents(updatedStudentsArray);
  };

  const updateStudent = (updatedStudent) => {
    const updatedStudentsArray = allStudents.map((student) =>
      student.id === updatedStudent.id ? { ...student, ...updatedStudent } : student
    );
    saveStudents(updatedStudentsArray);
  };

  const students = [
    {
      image: 'images/student1.jpg',
      id: nanoid(),
      firstName: 'Tommi',
      lastName: 'Ludlow',
      gradYear: 2001,
      email: 'tludlow0@friendfeed.com',
    },
    {
      image: 'images/student2.jpg',
      id: nanoid(),
      firstName: 'Hewe',
      lastName: 'Simonot',
      gradYear: 2001,
      email: 'hsimonot1@hostgator.com',
    },
    {
      image: 'images/student3.jpg',
      id: nanoid(),
      firstName: 'Killian',
      lastName: 'Greaves',
      gradYear: 2001,
      email: 'kgreaves2@economist.com',
    },
    {
      image: 'images/student4.jpg',
      id: nanoid(),
      firstName: 'Rozanne',
      lastName: 'Westpfel',
      gradYear: 2002,
      email: 'rwestpfel3@jimdo.com',
    },
    {
      image: 'images/student5.jpg',
      id: nanoid(),
      firstName: 'Gilly',
      lastName: 'Foden',
      gradYear: 2002,
      email: 'gfoden4@cbc.ca',
    },
    {
      image: 'images/student6.jpg',
      id: nanoid(),
      firstName: 'Reynold',
      lastName: 'Bundock',
      gradYear: 2003,
      email: 'rbundock5@berkeley.edu',
    },
    {
      image: 'images/student7.jpg',
      id: nanoid(),
      firstName: 'Ode',
      lastName: 'Metzke',
      gradYear: 2003,
      email: 'ometzke6@nytimes.com',
    },
    {
      image: 'images/student8.jpg',
      id: nanoid(),
      firstName: 'Mair',
      lastName: 'Blaxlande',
      gradYear: 2003,
      email: 'mblaxlande7@twitpic.com',
    },
    {
      image: 'images/student9.jpg',
      id: nanoid(),
      firstName: 'Sada',
      lastName: 'Ivchenko',
      gradYear: 2004,
      email: 'sivchenko8@intel.com',
    },
    {
      image: 'images/student10.jpg',
      id: nanoid(),
      firstName: 'Sharl',
      lastName: 'McGreay',
      gradYear: 2004,
      email: 'smcgreay9@jugem.jp',
    },
  ];

  return (
    <div className="container">
      <div className="row" id="allStudents">
        <h3>Current Students</h3>
        {searchResults &&
          searchResults.map((student) => (
            <div className="col-lg-2" key={student.id}>
              <Student student={student} removeStudent={removeStudent} updateStudent={updateStudent} />
            </div>
          ))}
      </div>
      {/* {!allStudents && <button onClick={() => saveStudents(students)} type="button" className="btn btn-lg btn-success">Save Students</button>} */}
      <AddStudent addStudent={addStudent} />
      <div className="row mt-4" id="searchStudent">
        <h3>Student Search</h3>
        <div className="col-md-4">
          <label htmlFor="txtKeywords">Search by First Name or Last Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Student Name"
            onChange={(evt) => setKeywords(evt.currentTarget.value)}
            value={keywords}
          />
        </div>
        <div className="col-md-4">
          <select value={gradYear} onChange={(evt) => setGradYear(evt.currentTarget.value)} className="form-select">
            <option value="">Select Year</option>
            {_(allStudents)
              .map((student) => student.gradYear)
              .sort()
              .uniq()
              .map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))
              .value()}
          </select>
        </div>
        <div className="col-md-4">
          <button type="button" className="btn btn-primary" onClick={searchStudents}>
            Search Students
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default App;
