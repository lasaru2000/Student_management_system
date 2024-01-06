using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/teacher")]
    [ApiController]
    public class TeacherController : Controller
    {
        private readonly ApplicationDbContext _context;

        public TeacherController(ApplicationDbContext context)
        {
            _context = context;
        }
        // GET: api/teacher
        [HttpGet]
        public IActionResult GetTeacher()
        {
            var teachers = _context.Teacher.ToList();
            return Ok(teachers);
        }

        // POST: api/teacher
        [HttpPost]
        public async Task<IActionResult> CreateTeacher(Teacher teacher)
        {
            if (ModelState.IsValid)
            {
                _context.Teacher.Add(teacher);
                await _context.SaveChangesAsync();
                return Ok(teacher.TeacherID);
            }
            return BadRequest(ModelState);
        }
        // PUT: api/teacher/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTeacher(int id, Teacher teacher)
        {


            // Check if the student with the given ID exists
            var existingTeacher = await _context.Teacher.FindAsync(id);
            if (existingTeacher == null)
            {
                return NotFound();
            }

            // Update the properties of the existing student with the new values
            existingTeacher.FirstName = teacher.FirstName;
            existingTeacher.LastName = teacher.LastName;
            existingTeacher.ContactNo = teacher.ContactNo;
            existingTeacher.EmailAddress = teacher.EmailAddress;

            // Save changes to the database
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TeacherExists(id))
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
        private bool TeacherExists(int id)
        {
            return _context.Teacher.Any(e => e.TeacherID == id);
        }

        // DELETE: api/teacher/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTeacher(int id)
        {
            var teacher = await _context.Teacher.FindAsync(id);
            if (teacher == null)
            {
                return NotFound();
            }

            _context.Teacher.Remove(teacher);


            await RemoveTeacherFromAllocateSubject(teacher.FirstName + " " + teacher.LastName);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task RemoveTeacherFromAllocateSubject(string teacherName)
        {
            var allocateSubjects = await _context.AllocateSubject
                                         .Where(s => s.TeacherName == teacherName)
                                         .ToListAsync();

            if (allocateSubjects != null && allocateSubjects.Any())
            {
                _context.AllocateSubject.RemoveRange(allocateSubjects);
                await _context.SaveChangesAsync();
            }


        }
    }
}
