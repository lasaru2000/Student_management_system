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
  const [selectedOption, setSelectedOption] = useState('');
  const [classOptions, setClassOptions] = useState([]);
  
  
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

  useEffect(() => {
    // Make an API request to fetch the list of classes
    axios.get('https://localhost:7190/api/classroom') 
      .then((response) => {
        // Assuming the API returns an array of teacher names, update the state
       setClassOptions(response.data);

        if (response.data.length > 0) {
            setSelectedOption(`${response.data[0].className}`);
          }
      })
      .catch((error) => {
        console.error('Error fetching class data:', error);
      });
  }, []);

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
  };


  // submit new data to database
  const handleSubmit = () => {

    if (!firstName || !lastName || !contactNo || !email || !contactPerson || !email  || !dob || !selectedOption  ) {
      alert('Fill all fileds!');
      return; 
      
    }
    // Create an object with the values
    const data = {
      "firstName": firstName,
  "lastName": lastName,
  "contactPerson": contactPerson,
  "contactNo": contactNo,
  "emailAddress": email,
  "dateOfBirth": dob,
  "classroom": selectedOption
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

       setSelectedOption('');

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

const calculateAge = (dob) => {

  const dobDate = new Date(dob);
  const now = new Date();

  // Calculate the difference in years between the current year and the year of birth
  let age = now.getFullYear() - dobDate.getFullYear();

  // Calculate the difference in months between the current month and the month of birth
  const monthDiff = now.getMonth() - dobDate.getMonth();


  // If the month difference is negative or if the month difference is 0 and the current date is before the date of birth,
                                                                                  
  if (monthDiff < 0 || (monthDiff === 0 && now.getDate() < dobDate.getDate())) {
    // If the birthday hasn't occurred yet, decrement the age by 1
    age--;
  }

  // Return the calculated age
  return age;
};


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
   setSelectedOption(student.classroom);
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
      "classroom": selectedOption
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
        setSelectedOption('');

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
    setSelectedOption('');
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
              // onChange={(e) => setAge(e.target.value)} 
              value={calculateAge(dob)}
              readOnly
            />
            </div>
            <div className='textbox'>
                <h2 className='h2'>Classroom</h2>
                <select className='input' placeholder='Select Classroom' value={selectedOption} onChange={handleOptionChange}>
    {classOptions.map((option, index) => (
      <option key={index} value={option.className}>
        {option.className}
      </option>
    ))}
  </select>
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
            <td>{calculateAge(student.dateOfBirthString)}</td>
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