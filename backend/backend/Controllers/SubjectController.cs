using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace backend.Controllers
{
    [Route("api/subjects")]
    [ApiController]
    public class SubjectController : Controller
    {
        private readonly ApplicationDbContext _context;

        public SubjectController(ApplicationDbContext context)
        {
            _context = context;
        }

        // GET: api/subjects
        [HttpGet]
        public IActionResult GetSubjects()
        {
            var subjects = _context.Subjects.ToList();
            return Ok(subjects);
        }
        // POST: api/subjects
        [HttpPost]
        public async Task<IActionResult> CreateSubject(Subjects subject)
        {
            if (ModelState.IsValid)
            {
                _context.Subjects.Add(subject);
                await _context.SaveChangesAsync();
                return Ok(subject.SubjectID);
            }
            return BadRequest(ModelState);
        }
        // PUT: api/subjects/5
        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateSubject(int id, Subjects subjects)
        {


            // Check if the subject with the given ID exists
            var existingSubjects = await _context.Subjects.FindAsync(id);
            if (existingSubjects == null)
            {
                return NotFound();
            }

            // Update the properties of the existing student with the new values
            existingSubjects.SubjectName = subjects.SubjectName;

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
            return _context.Subjects.Any(e => e.SubjectID == id);
        }

        // DELETE: api/subjects/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSubjects(int id)
        {
            var subjects = await _context.Subjects.FindAsync(id);
            if (subjects == null)
            {
                return NotFound();
            }

            _context.Subjects.Remove(subjects);

            await RemoveSubject(subjects.SubjectName);

            await _context.SaveChangesAsync();

            return NoContent();
        }

        private async Task RemoveSubject (string subject)
        {
            var allocateSubjects = await _context.AllocateSubject.ToListAsync();

            foreach (var allocateSubject in allocateSubjects)
            {
               if(!string.IsNullOrWhiteSpace(allocateSubject.Subjects))
                {
                    var subjectsArray = allocateSubject.Subjects.Split(",");
                    var updateSubjects = subjectsArray.Where(x => x.Trim() != subject).ToList();
                    allocateSubject.Subjects = string.Join(",", updateSubjects);

                    if (updateSubjects.Count == 0)
                    {
                        _context.AllocateSubject.Remove(allocateSubject);
                    }
                }
            }
        }



    }
}
