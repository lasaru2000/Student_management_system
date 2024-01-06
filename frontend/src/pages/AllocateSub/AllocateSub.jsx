import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Allocate.css'


function AllocateSub() {

    const [selectedOption, setSelectedOption] = useState('');
    const [teacherOptions, setTeacherOptions] = useState([]);

    const [selectedOption1, setSelectedOption1] = useState('');
    const [subjectOptions, setSubjectOptions] = useState([]);

    const [allocatedSubjects, setAllocatedSubjects] = useState([]);

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
          axios.get(`https://localhost:7190/api/allocatesub/${selectedOption}`)
            .then((response) => {
              if (response.data && response.data.length > 0) {
                // Assuming the API returns an array of subjects for the selected teacher, update the allocatedSubjects state
                const allocateSubId = response.data.map((item) => item.allocateSubID);
                setAllocatedID(allocateSubId);
                const subjectsArray = response.data.map((item) => item.subjects.split(',')).flat();
                setAllocatedSubjects(subjectsArray);
              } else {
                // If response.data is null or empty, set allocatedID to 0
                setAllocatedID(0);
                setAllocatedSubjects([]);
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
        
        const substring = allocatedSubjects.join(",");

        const updatedData = {
            "teacherName": selectedOption,
            "subjects":substring,
      
      
          };

          axios.put(`https://localhost:7190/api/allocatesub/${allocatedID}`, updatedData)
          .then(response => {
            // Handle success, e.g., show a success message
            alert('Data updated successfully!', updatedData);
    
            
        })

   


    };
      


    

    

       
      
// get subjects

useEffect(() => {
    // Make an API request to fetch the list of teachers
    axios.get('https://localhost:7190/api/subjects') 
      .then((response) => {
        // Assuming the API returns an array of teacher names, update the state
        setSubjectOptions(response.data);

        if (response.data.length > 0) {
            setSelectedOption1(`${response.data[0].subjectName}`);
          }
      })
      .catch((error) => {
        console.error('Error fetching teacher data:', error);
      });
  }, []);

  const handleOptionChange1 = (e) => {
    setSelectedOption1(e.target.value);
  };

  const handleAllocate = () => {
    if (selectedOption1 && !allocatedSubjects.includes(selectedOption1)) {
      setAllocatedSubjects([...allocatedSubjects, selectedOption1]);
    }
  };

  const handleDeallocate = (subject) => {
    const updatedSubjects = allocatedSubjects.filter((s) => s !== subject);
    setAllocatedSubjects(updatedSubjects);
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

        <div className='uppermainSub'>
        <div className='lowerSub'>
            <fieldset className='field'>
                <legend>Allocate Subjects</legend>
                <div>
                <table className='trow'>
                <tr ><td>Subject</td>
                <td >
     <select className='drop1' placeholder='Select Teacher' value={selectedOption1} onChange={handleOptionChange1}>
        {subjectOptions.map((option, index) => (
          <option key={index} value={option.subjectName}>
            {option.subjectName}
          </option>
        ))}
      </select>
      <button className='button'  type="button" onClick={handleAllocate} >Allocate</button>
      </td>
      </tr>
                </table>
                </div>
               
                <div className='uppermain'>
                    <div className='table-container'>
                    <table className='table'>
                    <thead>
                        <tr>
                            <th>Subjects</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                  {allocatedSubjects.map((subject, index) => (
                    <tr key={index}>
                      <td>{subject}</td>
                      <td>
                        <button
                          className='button1'
                          onClick={() => handleDeallocate(subject)}
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

export default AllocateSub