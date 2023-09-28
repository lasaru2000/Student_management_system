import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './teachers.css'
import menu from '../../assets/icons8-menu.svg';
import user from '../../assets/icons8-user-24.png';
import home from '../../assets/icons8-home-24.png';
import arrow from '../../assets/icons8-arrow-24.png';
import cube from '../../assets/icons8-cube-24.png';

function Teachers() {

const [teachers, setTeachers] = useState([]);
  const [selectedTeacher, setSelectedTeacher] = useState(null);
  
//get data from database 
  useEffect(() => {
    axios.get('https://localhost:7190/api/teacher')
        .then(response => {
            setTeachers(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}, []);

  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [contactNo, setContactNo] = useState('');
  const [email, setEmail] = useState('');


  // submit new data to database
  const handleSubmit = () => {
    // Create an object with the values
    const data = {
      "firstName": firstName,
  "lastName": lastName,
  "contactNo": contactNo,
  "emailAddress": email,
    };

   
    axios.post('https://localhost:7190/api/teacher', data)
      .then(response => {
        // Handle success, e.g., show a success message
       alert('Data sent successfully!', data);

       //clear textbox values
       setSelectedTeacher(null);
       setFirstName('');
       setLastName('');
       setContactNo('');
       setEmail('');


       //call get again to load data again
       axios.get('https://localhost:7190/api/teacher')
       .then(response => {
         setTeachers(response.data);
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


  //edit part

  const handleEditClick = (teacher) => {
    setSelectedTeacher(teacher);
  
    // Populate all input fields from the selected student's data
    setFirstName(teacher.firstName);
    setLastName(teacher.lastName);
    setContactNo(teacher.contactNo);
    setEmail(teacher.emailAddress);

  };
  
  const handleUpdate = () => {
    // Create an object with the updated values
    const updatedData = {
      "firstName": firstName,
      "lastName": lastName,
      "contactNo": contactNo,
      "emailAddress": email,

    };

    axios.put(`https://localhost:7190/api/teacher/${selectedTeacher.teacherID}`, updatedData)
      .then(response => {
        // Handle success, e.g., show a success message
        alert('Data updated successfully!', updatedData);

        // Clear selectedStudent and reset input fields
        setSelectedTeacher(null);
        setFirstName('');
        setLastName('');
        setContactNo('');
        setEmail('');


        //call get again to load data again
       axios.get('https://localhost:7190/api/teacher')
       .then(response => {
         setTeachers(response.data);
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

    setSelectedTeacher(null);
    setFirstName('');
    setLastName('');
    setContactNo('');
    setEmail('');

  }

  //delete method 

  const handleDeleteClick = (teacherID) => {
    // Send a DELETE request to the API
    axios.delete(`https://localhost:7190/api/teacher/${teacherID}`)
      .then(response => {
        // Handle success, e.g., show a success message
        alert('Data deleted successfully!');
        // Remove the deleted teacher from the list
        setTeachers(prevTeachers => prevTeachers.filter(teacher => teacher.teacherID !== teacherID));
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
    <h1 className='h1'>Teachers</h1>

    </div>

    <div className='thead'>

    <div className='thirdhead'>

    <img src={cube} alt='cube'/>
    <h1 className='h1'>Teachers Details</h1>
        

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
        </div>
       
        <div className='button-row'>
        {selectedTeacher === null && (
        <button className='button' type="submit" onClick={handleSubmit}>Submit</button>
        )}
        {selectedTeacher && (
        <button className='button' type="button" onClick={handleUpdate}>Update</button>
        )}
           <button className='button'  type="button" onClick={handleReset}>Reset</button>
        </div>
        
    </div>
    </div>

    <div className='thead'>
    <div className='thirdhead'>
         <img src={cube} alt='cube'/>
         <h1 className='h1'>Exisiting Teachers</h1>
    </div>
    </div>
    <div className='thead'>
    <div className="table-container">
  <table className="eight-column-table">
    <thead>
      <tr>
        <th>First Name</th>
        <th>Last Name</th>
        <th>Contact No</th>
        <th>Email Address</th>

      </tr>
    </thead>
    <tbody>
    {teachers.map(teacher => (
      <tr key={teacher.studentID}>
        <td> {teacher.firstName}</td>
        <td>{teacher.lastName}</td>
        <td>{teacher.contactNo}</td>
        <td>{teacher.emailAddress}</td>

        <td> <div >
           <button className='button1'  onClick={() => handleEditClick(teacher)}>Edit</button>
           <button className='button1' onClick={() => handleDeleteClick(teacher.teacherID)} >Delete</button>
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

export default Teachers