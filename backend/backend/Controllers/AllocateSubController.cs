using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/allocatesub")]
    [ApiController]
    public class AllocateSubController : Controller
    {
        private readonly ApplicationDbContext _context;

        public AllocateSubController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/allocatesub
        [HttpGet("{name}")]
        public async Task <IActionResult> GetAllocateSubjects( string name  )
        {

            try
            {
                var subjects = await _context.AllocateSubject
                    .Where(subject => subject.TeacherName == name)
                    .ToListAsync();

                if (subjects.Count == 0)
                {
                    return Ok("0");
                }

                return Ok(subjects);
            }
            catch (Exception ex)
            {
                // Handle database or other exceptions here
                return StatusCode(500, $"Internal Server Error: {ex.Message}");
            }

        }
        // PUT: api/allocatesub/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateAllocateSub(int id, AllocateSubject allocateSubject)
        {
            if (id == 0)
            {
                // Find the maximum AllocateSubID in the database and increment it by 1
                int maxAllocateSubID = await _context.AllocateSubject.MaxAsync(a => (int?)a.AllocateSubID) ?? 0;
                allocateSubject.AllocateSubID = maxAllocateSubID + 1;

                if (ModelState.IsValid)
                {
                    _context.AllocateSubject.Add(allocateSubject);
                    await _context.SaveChangesAsync();
                    return Ok(allocateSubject.AllocateSubID);
                }

                return BadRequest();
            }

            // Check if the Allocatesubject with the given ID exists
            var existingSubjects = await _context.AllocateSubject.FindAsync(id);

            if (existingSubjects == null)
            {
                return NotFound(); // Row with specified id doesn't exist
            }

            if (allocateSubject.Subjects == "")
            {
                // Remove the entire row based on the AllocateSubID
                _context.AllocateSubject.Remove(existingSubjects);
            }
            else
            {
                // Update the properties of the existing record with the new values
                existingSubjects.Subjects = allocateSubject.Subjects;
               
            }

            // Save changes to the database
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SubjectExists(id))
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
        private bool SubjectExists(int id)
        {
            return _context.AllocateSubject.Any(e => e.AllocateSubID == id);
        }
    }
}
