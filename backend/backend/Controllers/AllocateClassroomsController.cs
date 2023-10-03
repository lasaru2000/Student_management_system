using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/allocateclass")]
    [ApiController]
    public class AllocateClassroomsController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AllocateClassroomsController(ApplicationDbContext context)
        {
            _context = context;
        }
        // GET: api/allocateclass
        [HttpGet]
        public IActionResult GetClassrooms()
        {
            var classrooms = _context.AllocateClass.ToList();
            return Ok(classrooms);
        }
        // GET: api/allocateclass
        [HttpGet("{name}")]
        public async Task<IActionResult> GetAllocateClass(string name)
        {

            try
            {
                var classrooms = await _context.AllocateClass
                    .Where(classroom => classroom.TeacherName == name)
                    .ToListAsync();

                if (classrooms.Count == 0)
                {
                    return Ok("0");
                }

                return Ok(classrooms);
            }
            catch (Exception ex)
            {
                // Handle database or other exceptions here
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }

        }
        // PUT: api/allocateclass/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAllocateClass(int id, AllocateClass allocateClassrooms)
        {
            if (id == 0)
            {
                // Find the maximum AllocateSubID in the database and increment it by 1
                int maxAllocateClassID = await _context.AllocateClass.MaxAsync(a => (int?)a.AllocateClassID) ?? 0;
                allocateClassrooms.AllocateClassID = maxAllocateClassID + 1;

                if (ModelState.IsValid)
                {
                    _context.AllocateClass.Add(allocateClassrooms);
                    await _context.SaveChangesAsync();
                    return Ok(allocateClassrooms.AllocateClassID);
                }

                return BadRequest();
            }

            // Check if the Allocatesubject with the given ID exists
            var existingClass = await _context.AllocateClass.FindAsync(id);

            if (existingClass == null)
            {
                return NotFound(); // Row with specified id doesn't exist
            }

            if (allocateClassrooms.Classrooms == "")
            {
                // Remove the entire row based on the AllocateSubID
                _context.AllocateClass.Remove(existingClass);
            }
            else
            {
                // Update the properties of the existing record with the new values
                existingClass.Classrooms = allocateClassrooms.Classrooms;

            }

            // Save changes to the database
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!ClassExists(id))
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
        private bool ClassExists(int id)
        {
            return _context.AllocateClass.Any(e => e.AllocateClassID == id);
        }
    }
}
