import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import axios from 'axios';
import './Subjects.css'
import menu from '../../assets/icons8-menu.svg';
import user from '../../assets/icons8-user-24.png';
import home from '../../assets/icons8-home-24.png';
import arrow from '../../assets/icons8-arrow-24.png';
import cube from '../../assets/icons8-cube-24.png';

function Subjects() {
    const [subjects, setSubjects] = useState([]);
    const [selectedSubjects, setSelectedSubjects] = useState(null);
    
  //get data from database 
    useEffect(() => {
      axios.get('https://localhost:7190/api/subjects')
          .then(response => {
              setSubjects(response.data);
          })
          .catch(error => {
              console.error('Error fetching data:', error);
          });
  }, []);
  
    const [subjectName, setSubjectName] = useState('');
  
    // submit new data to database
    const handleSubmit = () => {
      if (!subjectName) {
        alert('Subject Name cannot be empty!');
        return; // Stop sending data if subjectName is null
      }
      // Create an object with the values
      const data = {
        "subjectName": subjectName,
  
      };
  
     
      axios.post('https://localhost:7190/api/subjects', data)
        .then(response => {
          // Handle success, e.g., show a success message
         alert('Data sent successfully!', data);
  
         //clear textbox values
         setSelectedSubjects(null);
         setSubjectName('');
    
  
  
         //call get again to load data again
         axios.get('https://localhost:7190/api/subjects')
         .then(response => {
           setSubjects(response.data);
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
  
    const handleEditClick = (subject) => {
      setSelectedSubjects(subject);
    
      // Populate all input fields from the selected student's data
      setSubjectName(subject.subjectName);
  
  
    };
    
    const handleUpdate = () => {
      // Create an object with the updated values
      const updatedData = {
        "subjectName": subjectName,
  
  
      };
  
      axios.put(`https://localhost:7190/api/subjects/${selectedSubjects.subjectID}`, updatedData)
        .then(response => {
          // Handle success, e.g., show a success message
          alert('Data updated successfully!', updatedData);
  
          // Clear selectedStudent and reset input fields
          setSelectedSubjects(null);
          setSubjectName('');
  
  
  
          //call get again to load data again
          axios.get('https://localhost:7190/api/subjects')
          .then(response => {
            setSubjects(response.data);
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
  
      setSelectedSubjects(null);
      setSubjectName('');
  
    }
  
    //delete method 
  
    const handleDeleteClick = (subjectID) => {
      // Send a DELETE request to the API
      axios.delete(`https://localhost:7190/api/subjects/${subjectID}`)
        .then(response => {
          // Handle success, e.g., show a success message
          alert('Data deleted successfully!');
          // Remove the deleted teacher from the list
          setSubjects(prevSubjects => prevSubjects.filter(subjects => subjects.subjectID !== subjectID));
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
    <h1 className='h1'>Subjects</h1>

    </div>

    <div className='thead'>

    <div className='thirdhead'>

    <img src={cube} alt='cube'/>
    <h1 className='h1'>Subject Details</h1>
        

    </div>
    </div>
    <div className='thead'>

    <div className='details'>
        <div className='details1'>

       
        <div className='textbox'>
            <h2 className='h2'>subject Name</h2>
            <input
          type="text"
          className='input'
          name='subjectName'
          onChange={(e) => setSubjectName(e.target.value)} 
          value={subjectName}
        />

        </div>

       
        </div>
       
        <div className='button-row'>
        {selectedSubjects === null && (
        <button className='button' type="submit" onClick={handleSubmit}>Submit</button>
        )}
        {selectedSubjects && (
        <button className='button' type="button" onClick={handleUpdate}>Update</button>
        )}
           <button className='button'  type="button" onClick={handleReset}>Reset</button>
        </div>
        
    </div>
    </div>

    <div className='thead'>
    <div className='thirdhead'>
         <img src={cube} alt='cube'/>
         <h1 className='h1'>Exisiting Subjects</h1>
    </div>
    </div>
    <div className='thead'>
    <div className="table-container">
  <table className="eight-column-table">
    <thead>
      <tr>
        <th>Subject Name</th>
        <th>Actions</th>


      </tr>
    </thead>
    <tbody>
    {subjects.map(subject => (
      <tr key={subject.subjectID}>
        <td> {subject.subjectName}</td>

        <td> <div >
           <button className='button1'  onClick={() => handleEditClick(subject)}>Edit</button>
           <button className='button1' onClick={() => handleDeleteClick(subject.subjectID)} >Delete</button>
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

export default Subjects