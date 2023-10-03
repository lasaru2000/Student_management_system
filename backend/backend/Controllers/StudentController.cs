using backend.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks; // Add this for asynchronous operations

namespace backend.Controllers
{
    [Route("api/student")]
    [ApiController]
    public class StudentController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public StudentController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/student
        [HttpGet]
        public IActionResult GetStudents()
        {
            var students = _context.Student.ToList();
            return Ok(students);
        }
        // GET: api/student
        [HttpGet("{name}")]
        public async Task<IActionResult> Getselectedstudents(string name)
        {

            try
            {
                var students = await _context.Student
                    .Where(student => student.FirstName + " " + student.LastName == name)
                    .ToListAsync();

                if (students.Count == 0)
                {
                    return Ok("0");
                }

                return Ok(students);
            }
            catch (Exception ex)
            {
                // Handle database or other exceptions here
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }

        }

        // POST: api/student
        [HttpPost]
        public async Task<IActionResult> CreateStudent(Student student)
        {
            if (ModelState.IsValid)
            {
                _context.Student.Add(student);
                await _context.SaveChangesAsync();
                return Ok(student.StudentID);
            }
            return BadRequest(ModelState);
        }

        // PUT: api/student/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateStudent(int id, Student student)
        {
         

            // Check if the student with the given ID exists
            var existingStudent = await _context.Student.FindAsync(id);
            if (existingStudent == null)
            {
                return NotFound();
            }

            // Update the properties of the existing student with the new values
            existingStudent.FirstName = student.FirstName;
            existingStudent.LastName = student.LastName;
            existingStudent.ContactPerson = student.ContactPerson;
            existingStudent.ContactNo = student.ContactNo;
            existingStudent.EmailAddress = student.EmailAddress;
            existingStudent.DateOfBirth = student.DateOfBirth;
            existingStudent.Age = student.Age;
            existingStudent.Classroom = student.Classroom;

            // Save changes to the database
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!StudentExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // Helper method to check if a student exists
        private bool StudentExists(int id)
        {
            return _context.Student.Any(e => e.StudentID == id);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteStudent(int id)
        {
            var student = await _context.Student.FindAsync(id);
            if (student == null)
            {
                return NotFound();
            }

            _context.Student.Remove(student);
            await _context.SaveChangesAsync();

            return NoContent();
        }
    }
}
