import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './classrooms.css'
import menu from '../../assets/icons8-menu.svg';
import user from '../../assets/icons8-user-24.png';
import home from '../../assets/icons8-home-24.png';
import arrow from '../../assets/icons8-arrow-24.png';
import cube from '../../assets/icons8-cube-24.png';

function Classrooms() {
  const [classrooms, setClassrooms] = useState([]);
  const [selectedClassroom, setSelectedClassroom] = useState(null);
  
//get data from database 
  useEffect(() => {
    axios.get('https://localhost:7190/api/classroom')
        .then(response => {
            setClassrooms(response.data);
        })
        .catch(error => {
            console.error('Error fetching data:', error);
        });
}, []);

  const [className, setClassName] = useState('');

  // submit new data to database
  const handleSubmit = () => {

    if (!className) {
      alert('Class Name cannot be empty!');
      return; // Stop sending data if subjectName is null
    }
    // Create an object with the values
    const data = {
      "className": className,

    };

   
    axios.post('https://localhost:7190/api/classroom', data)
      .then(response => {
        // Handle success, e.g., show a success message
       alert('Data sent successfully!', data);

       //clear textbox values
       setSelectedClassroom(null);
       setClassName('');
  


       //call get again to load data again
       axios.get('https://localhost:7190/api/classroom')
       .then(response => {
         setClassrooms(response.data);
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

  const handleEditClick = (classroom) => {
    setSelectedClassroom(classroom);
  
    // Populate all input fields from the selected student's data
    setClassName(classroom.className);


  };
  
  const handleUpdate = () => {
    // Create an object with the updated values
    const updatedData = {
      "className": className,


    };

    axios.put(`https://localhost:7190/api/classroom/${selectedClassroom.classroomID}`, updatedData)
      .then(response => {
        // Handle success, e.g., show a success message
        alert('Data updated successfully!', updatedData);

        // Clear selectedStudent and reset input fields
        setSelectedClassroom(null);
        setClassName('');



        //call get again to load data again
        axios.get('https://localhost:7190/api/classroom')
        .then(response => {
          setClassrooms(response.data);
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

    setSelectedClassroom(null);
    setClassName('');

  }

  //delete method 

  const handleDeleteClick = (classroomID) => {
    // Send a DELETE request to the API
    axios.delete(`https://localhost:7190/api/classroom/${classroomID}`)
      .then(response => {
        // Handle success, e.g., show a success message
        alert('Data deleted successfully!');
        // Remove the deleted teacher from the list
        setClassrooms(prevClassrooms => prevClassrooms.filter(classrooms => classrooms.classroomID !== classroomID));
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
    <h1 className='h1'>Classrooms</h1>

    </div>

    <div className='thead'>

    <div className='thirdhead'>

    <img src={cube} alt='cube'/>
    <h1 className='h1'>Class Details</h1>
        

    </div>
    </div>
    <div className='thead'>

    <div className='details'>
        <div className='details1'>

       
        <div className='textbox'>
            <h2 className='h2'>Class Name</h2>
            <input
          type="text"
          className='input'
          name='className'
          onChange={(e) => setClassName(e.target.value)} 
          value={className}
        />

        </div>

       
        </div>
       
        <div className='button-row'>
        {selectedClassroom === null && (
        <button className='button' type="submit" onClick={handleSubmit}>Submit</button>
        )}
        {selectedClassroom&& (
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
        <th>Class Name</th>
        <th>Actions</th>


      </tr>
    </thead>
    <tbody>
    {classrooms.map(classroom => (
      <tr key={classroom.classroomID}>
        <td> {classroom.className}</td>

        <td> <div >
           <button className='button1'  onClick={() => handleEditClick(classroom)}>Edit</button>
           <button className='button1' onClick={() => handleDeleteClick(classroom.classroomID)} >Delete</button>
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

export default Classrooms