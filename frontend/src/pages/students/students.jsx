import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './students.css'
import menu from '../../assets/icons8-menu.svg';
import user from '../../assets/icons8-user-24.png';
import home from '../../assets/icons8-home-24.png';
import arrow from '../../assets/icons8-arrow-24.png';
import cube from '../../assets/icons8-cube-24.png';

function Students() {
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  
//get data from database 
  useEffect(() => {
    axios.get('https://localhost:7190/api/student')
        .then(response => {
            setStudents(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}, []);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');
  const [dob, setDOB] = useState('');
  const [age, setAge] = useState('');
  const [classroom, setClassRoom] = useState('');


  // submit new data to database
  const handleSubmit = () => {
    // Create an object with the values
    const data = {
      "firstName": firstName,
  "lastName": lastName,
  "contactPerson": contactPerson,
  "contactNo": contactNo,
  "emailAddress": email,
  "dateOfBirth": dob,
  "age": age,
  "classroom": classroom
    };

   
    axios.post('https://localhost:7190/api/student', data)
      .then(response => {
        // Handle success, e.g., show a success message
       alert('Data sent successfully!', data);

       //clear textbox values
       setSelectedStudent(null);
       setFirstName('');
       setLastName('');
       setContactPerson('');
       setContactNo('');
       setEmail('');
       setDOB('');
       setAge('');
       setClassRoom('');

       //call get again to load data again
       axios.get('https://localhost:7190/api/student')
       .then(response => {
         setStudents(response.data);
       })
       .catch(error => {
         console.error('Error fetching data:', error);
       });
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        alert('Error sending data:', error);
      });
  
  };

  // age calculation 

  useEffect(() => {
    if (dob) {
      // Calculate age based on the selected DOB
      const currentDate = new Date();
      const selectedDate = new Date(dob);
      const ageDiff = currentDate.getFullYear() - selectedDate.getFullYear();

      // Check if the birthday for this year has already occurred
      if (
        currentDate.getMonth() < selectedDate.getMonth() ||
        (currentDate.getMonth() === selectedDate.getMonth() &&
          currentDate.getDate() < selectedDate.getDate())
      ) {
        setAge(ageDiff - 1); // Subtract 1 year if birthday hasn't occurred yet
      } else {
        setAge(ageDiff);
      }
    } else {
      setAge(''); // Reset age if DOB is cleared
    }
  }, [dob]);

  //edit part

  const handleEditClick = (student) => {
    setSelectedStudent(student);
  
    // Populate all input fields from the selected student's data
    setFirstName(student.firstName);
    setLastName(student.lastName);
    setContactPerson(student.contactPerson);
    setContactNo(student.contactNo);
    setEmail(student.emailAddress);
    setDOB(student.dateOfBirthString);
    setClassRoom(student.classroom);
  };
  
  const handleUpdate = () => {
    // Create an object with the updated values
    const updatedData = {
      "firstName": firstName,
      "lastName": lastName,
      "contactPerson": contactPerson,
      "contactNo": contactNo,
      "emailAddress": email,
      "dateOfBirth": dob,
      "age": age,
      "classroom": classroom
    };

    axios.put(`https://localhost:7190/api/student/${selectedStudent.studentID}`, updatedData)
      .then(response => {
        // Handle success, e.g., show a success message
        alert('Data updated successfully!', updatedData);

        // Clear selectedStudent and reset input fields
        setSelectedStudent(null);
        setFirstName('');
        setLastName('');
        setContactPerson('');
        setContactNo('');
        setEmail('');
        setDOB('');
        setAge('');
        setClassRoom('');

        //call get again to load data again
       axios.get('https://localhost:7190/api/student')
       .then(response => {
         setStudents(response.data);
       })
       .catch(error => {
         console.error('Error fetching data:', error);
       });
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        alert('Error updating data:', error);
      });


  };

  const handleReset = () =>{

    setSelectedStudent(null);
    setFirstName('');
    setLastName('');
    setContactPerson('');
    setContactNo('');
    setEmail('');
    setDOB('');
    setAge('');
    setClassRoom('');
  }

  //delete method 

  const handleDeleteClick = (studentID) => {
    // Send a DELETE request to the API
    axios.delete(`https://localhost:7190/api/student/${studentID}`)
      .then(response => {
        // Handle success, e.g., show a success message
        alert('Data deleted successfully!');
        // Remove the deleted student from the list
        setStudents(prevStudents => prevStudents.filter(student => student.studentID !== studentID));
      })
      .catch(error => {
        // Handle error, e.g., show an error message
        alert('Error deleting data:', error);
      });
  };

  return (
    <div>
        <div className='tophead'>
            <img src={menu} alt='menu'/>
            <img src={user} alt='user'/>
        </div>

        <div className='sechead'>

        <Link to={'/'}><img src={home} alt='home'/></Link>
        <img src={arrow} alt='arrow'/>
        <h1 className='h1'>Students</h1>

        </div>

        <div className='thead'>

        <div className='thirdhead'>

        <img src={cube} alt='cube'/>
        <h1 className='h1'>Students Details</h1>
            

        </div>
        </div>
        <div className='thead'>

        <div className='details'>
            <div className='details1'>

           
            <div className='textbox'>
                <h2 className='h2'>First Name</h2>
                <input
              type="text"
              className='input'
              name='firstName'
              onChange={(e) => setFirstName(e.target.value)} 
              value={firstName}
            />

            </div>

            <div className='textbox'>
                <h2 className='h2'>Last Name</h2>
                <input
              type="text"
              className='input'
              onChange={(e) => setLastName(e.target.value)} 
              value={lastName}
            />

            </div>

            <div className='textbox'>
                <h2 className='h2'>Contact Person </h2>
                <input
              type="text"
              className='input'
              onChange={(e) => setContactPerson(e.target.value)} 
              value={contactPerson}
            />

            </div>

              <div className='textbox'>
                <h2 className='h2'>Contact No</h2>
                <input
              type="text"
              className='input'
              onChange={(e) => setContactNo(e.target.value)} 
              value={contactNo}
            />

            </div>

            <div className='textbox'>
                <h2 className='h2'>Email Address</h2>
                <input
              type="email"
              className='input'
              onChange={(e) => setEmail(e.target.value)} 
              value={email}
            />

            </div>

            <div className='textbox'>
                <h2 className='h2'>DOB</h2>
                <input
              type="date"
              className='input'
              onChange={(e) => setDOB(e.target.value)} 
              value={dob}
            />

            </div>
            
            <div className='textbox'>
                <h2 className='h2'>Age</h2>
                <input
              type="number"
              className='input'
              onChange={(e) => setAge(e.target.value)} 
              value={age}
              disabled
            />
            </div>
            <div className='textbox'>
                <h2 className='h2'>Classroom</h2>
                <input
              type="text"
              className='input'
              onChange={(e) => setClassRoom(e.target.value)} 
              value={classroom}

            />
            </div>
            </div>
           
            <div className='button-row'>
            {selectedStudent === null && (
            <button className='button' type="submit" onClick={handleSubmit}>Submit</button>
            )}
            {selectedStudent && (
            <button className='button' type="button" onClick={handleUpdate}>Update</button>
            )}
               <button className='button'  type="button" onClick={handleReset}>Reset</button>
            </div>
            
        </div>
        </div>

        <div className='thead'>
        <div className='thirdhead'>
             <img src={cube} alt='cube'/>
             <h1 className='h1'>Exisiting Students</h1>
        </div>
        </div>
        <div className='thead'>
        <div className="table-container">
      <table className="eight-column-table">
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Contact Person</th>
            <th>Contact No</th>
            <th>Email Address</th>
            <th>Date of birth</th>
            <th>Age</th>
            <th>Classroom</th>
            <th>Column 9</th>
          </tr>
        </thead>
        <tbody>
        {students.map(student => (
          <tr key={student.studentID}>
            <td> {student.firstName}</td>
            <td>{student.lastName}</td>
            <td>{student.contactPerson}</td>
            <td>{student.contactNo}</td>
            <td>{student.emailAddress}</td>
            <td>{student.dateOfBirthString}</td>
            <td>{student.age}</td>
            <td>{student.classroom}</td>
            <td> <div >
               <button className='button1'  onClick={() => handleEditClick(student)}>Edit</button>
               <button className='button1' onClick={() => handleDeleteClick(student.studentID)} >Delete</button>
            </div></td>
          </tr>
             ))}
        </tbody>
      </table>
    </div>
        </div>

    </div>
  )
}

export default Students