import React, { useState, useEffect } from 'react';
import './Report.css'
import axios from 'axios';

function Report() {

  const [students, setStudents] = useState([]);
  const [classrooms, setClassrooms] = useState([]);
  const [selectedOption, setSelectedOption] = useState('');
  const [selectedStudent, setSelectedStudent] = useState(null); // To store the selected student data

  // Get data from the database 
  useEffect(() => {
    axios.get('https://localhost:7190/api/student')
      .then(response => {
        setStudents(response.data);
        if (response.data.length > 0) {
            setSelectedOption(`${response.data[0].firstName} ${response.data[0].lastName}`);
          }
        })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };

  useEffect(() => {
    if (selectedOption) {
      axios.get(`https://localhost:7190/api/student/${selectedOption}`)
        .then(response => {
          setSelectedStudent(response.data[0]); // Assuming you get a single student
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }
  }, [selectedOption]);

  useEffect(() => {
    axios.get('https://localhost:7190/api/allocatesub')
      .then(response => {
        setClassrooms(response.data);
        })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);



  return (
    <div>
      {/* upper section */}
      <div className='uppermainr'>
        <div className='upperr'>
          <fieldset className='field'>
            <legend>Student Details</legend>
            <table className='trow'>
              <tr>
                <div className='detailr'>
                  <div className='detailsr1'>

                  <div className='textbox'>
                <h2 className='h2'>student</h2>
                <select
    className='input'
    placeholder='Select Teacher'
    value={selectedOption}
    onChange={handleOptionChange}
  >
    {students.map((option, index) => (
      <option key={index} value={`${option.firstName} ${option.lastName}`}>
        {`${option.firstName} ${option.lastName}`}
      </option>
    ))}
  </select>

            </div>

   

            <div className='textbox'>
        <h2 className='h2'>Contact Person</h2>
        <input
          type="text"
          className='input'
          disabled
          value={selectedStudent ? selectedStudent.contactPerson : ''}
        />
      </div>

      <div className='textbox'>
        <h2 className='h2'>Contact No</h2>
        <input
          type="text"
          className='input'
          disabled
          value={selectedStudent ? selectedStudent.contactNo : ''}
        />
      </div>

      <div className='textbox'>
        <h2 className='h2'>Email Address</h2>
        <input
          type="email"
          className='input'
          disabled
          value={selectedStudent ? selectedStudent.emailAddress : ''}
        />
      </div>

      <div className='textbox'>
        <h2 className='h2'>DOB</h2>
        <input
          type="date"
          className='input'
          disabled
          value={selectedStudent ? selectedStudent.dateOfBirthString : ''}
        />
      </div>

      <div className='textbox'>
        <h2 className='h2'>Classroom</h2>
        <input
          type="text"
          className='input'
          disabled
          value={selectedStudent ? selectedStudent.classroom : ''}
        />
      </div>
    </div>
                </div>
              </tr>
            </table>
          </fieldset>
        </div>
      </div>

      {/* lower section */}
      <div className='uppermainr'>
        <div className='lowerr'>
          <fieldset className='field'>
            <legend>Teacher Details</legend>
            <table className='table'>
              <thead>
                <tr>
                  <th>Teacher</th>
                  <th>Classrooms</th>
                </tr>
              </thead>
              <tbody>
                {classrooms.map((classroom, index) => (
                <tr key={index}>
                  <td>{classroom.teacherName}</td>
                  <td>{classroom.subjects}</td>
                </tr>
              ))}
              </tbody>
            </table>
          </fieldset>
        </div>
      </div>
    </div>
  )
}

export default Report
