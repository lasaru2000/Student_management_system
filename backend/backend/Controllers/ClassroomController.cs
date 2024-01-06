using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;

namespace backend.Controllers
{
    [Route("api/classroom")]
    [ApiController]
    public class ClassroomController : Controller
    {
        private readonly ApplicationDbContext _context;

        public ClassroomController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/classroom
        [HttpGet]
        public IActionResult GetClassrooms()
        {
            var classrooms = _context.Classroom.ToList();
            return Ok(classrooms);
        }

        // POST: api/classroom
        [HttpPost]
        public async Task<IActionResult> CreateClassroom(Classroom classroom)
        {
            if (ModelState.IsValid)
            {
                _context.Classroom.Add(classroom);
                await _context.SaveChangesAsync();
                return Ok(classroom.ClassroomID);
            }
            return BadRequest(ModelState);
        }
        // PUT: api/classroom/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateClassroom(int id, Classroom classroom)
        {


            // Check if the student with the given ID exists
            var existingClassroom = await _context.Classroom.FindAsync(id);
            if (existingClassroom == null)
            {
                return NotFound();
            }

            // Update the properties of the existing student with the new values
            existingClassroom.ClassName = classroom.ClassName;
    
            // Save changes to the database
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassroomExists(id))
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
        private bool ClassroomExists(int id)
        {
            return _context.Classroom.Any(e => e.ClassroomID == id);
        }

        // DELETE: api/classroom/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteClassroom(int id)
        {
            var classroom = await _context.Classroom.FindAsync(id);
            if (classroom == null)
            {
                return NotFound();
            }

            _context.Classroom.Remove(classroom);

            await RemoveClassName(classroom.ClassName);

            await _context.SaveChangesAsync();



            return NoContent();
        }

        private async Task RemoveClassName (string className)
        {
            var allocateClasses = await _context.AllocateClass.ToListAsync();
            foreach ( var allocateClass in allocateClasses)
            {
                if(!string.IsNullOrEmpty(allocateClass.Classrooms))
                {
                    var classroomsArray = allocateClass.Classrooms.Split(',');
                    var updatedClassrooms = classroomsArray.Where(c => c.Trim() != className).ToList();
                    allocateClass.Classrooms = string.Join(",", updatedClassrooms);

                    if (updatedClassrooms.Count == 0)
                    {
                        _context.AllocateClass.Remove(allocateClass);
                    }

                }

                await _context.SaveChangesAsync();
            }

        }

    }
}
