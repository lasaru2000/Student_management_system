import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AllocateClass.css'


function AllocateClass() {

    const [selectedOption, setSelectedOption] = useState('');
    const [teacherOptions, setTeacherOptions] = useState([]);

    const [selectedOption1, setSelectedOption1] = useState('');
    const [classOptions, setClassOptions] = useState([]);

    const [allocatedClasses, setAllocatedClasses] = useState([]);

    const [allocatedID , setAllocatedID] = useState('');
  
//   get teachers
    useEffect(() => {
      // Make an API request to fetch the list of teachers
      axios.get('https://localhost:7190/api/teacher') 
        .then((response) => {
          // Assuming the API returns an array of teacher names, update the state
          
          setTeacherOptions(response.data);

          if (response.data.length > 0) {
            setSelectedOption(`${response.data[0].firstName} ${response.data[0].lastName}`);
          }
        })
        .catch((error) => {
          console.error('Error fetching teacher data:', error);
        });
    }, []);



    useEffect(() => {
        if (selectedOption) {
          // Make an API request to fetch subjects for the selected teacher
          axios.get(`https://localhost:7190/api/allocateclass/${selectedOption}`)
            .then((response) => {
              if (response.data && response.data.length > 0) {
                // Assuming the API returns an array of subjects for the selected teacher, update the allocatedSubjects state
                const allocateClassId = response.data.map((item) => item.allocateClassID);
                setAllocatedID(allocateClassId);
                const classesArray = response.data.map((item) => item.classrooms.split(',')).flat();
                setAllocatedClasses(classesArray);
              } else {
                // If response.data is null or empty, set allocatedID to 0
                setAllocatedID(0);
                setAllocatedClasses([]);
              }
            })
            .catch((error) => {
              console.error('Error fetching subjects for teacher:', error);
            });
        }
      }, [selectedOption]);
      

      const handleOptionChange = (e) => {
        setSelectedOption(e.target.value);
      };

      const handleMsg = () => {
        
        const substring = allocatedClasses.join(",");

        const updatedData = {
            "teacherName": selectedOption,
            "classrooms":substring,
      
      
          };

          axios.put(`https://localhost:7190/api/allocateclass/${allocatedID}`, updatedData)
          .then(response => {
            // Handle success, e.g., show a success message
            alert('Data updated successfully!', updatedData);
    
            
        })

   


    };
      

// get classes

useEffect(() => {
    // Make an API request to fetch the list of classes
    axios.get('https://localhost:7190/api/classroom') 
      .then((response) => {
        // Assuming the API returns an array of teacher names, update the state
       setClassOptions(response.data);

        if (response.data.length > 0) {
            setSelectedOption1(`${response.data[0].className}`);
          }
      })
      .catch((error) => {
        console.error('Error fetching class data:', error);
      });
  }, []);

  const handleOptionChange1 = (e) => {
    setSelectedOption1(e.target.value);
  };

  const handleAllocate = () => {
    if (selectedOption1 && !allocatedClasses.includes(selectedOption1)) {
      setAllocatedClasses([...allocatedClasses, selectedOption1]);
    }
  };

  const handleDeallocate = (classroom) => {
    const updatedClasses = allocatedClasses.filter((c) => c !== classroom);
   setAllocatedClasses(updatedClasses);
  };

  return (
    <div>
    {/* upper section */}

    <div className='uppermain'>
    <div className='upper'>
        <fieldset className='field'>
            <legend>Teacher Details</legend>
            <table className='trow'>
            <tr ><td>Teacher</td>
            <td >
            <select
    className='drop1'
    placeholder='Select Teacher'
    value={selectedOption}
    onChange={handleOptionChange}
  >
    {teacherOptions.map((option, index) => (
      <option key={index} value={`${option.firstName} ${option.lastName}`}>
        {`${option.firstName} ${option.lastName}`}
      </option>
    ))}
  </select>
  <button className='button'  type="button" onClick={handleMsg} >Save</button>
  </td>
  </tr>
            </table>

        </fieldset>
    </div>
    </div>

   {/* lower section */}

    <div className='uppermain'>
    <div className='lower'>
        <fieldset className='field'>
            <legend>Allocate Classes</legend>
            <table className='trow'>
            <tr ><td>Classroom</td>
            <td >
 <select className='drop1' placeholder='Select Classroom' value={selectedOption1} onChange={handleOptionChange1}>
    {classOptions.map((option, index) => (
      <option key={index} value={option.className}>
        {option.className}
      </option>
    ))}
  </select>
  <button className='button'  type="button" onClick={handleAllocate} >Allocate</button>
  </td>
  </tr>
            </table>
            <div className='uppermain'>
                <div className='table-container'>
                <table className='table'>
                <thead>
                    <tr>
                        <th>Classrooms</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
              {allocatedClasses.map((classroom, index) => (
                <tr key={index}>
                  <td>{classroom}</td>
                  <td>
                    <button
                      className='button1'
                      onClick={() => handleDeallocate(classroom)}
                    >
                      Deallocate
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
                </table>
                </div>

            </div>

        </fieldset>
    </div>
    </div>

</div>
  )
}

export default AllocateClass