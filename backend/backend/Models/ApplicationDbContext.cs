using Microsoft.EntityFrameworkCore;

namespace backend.Models
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options)
        {
        }

        public DbSet<Student> Student { get; set; }
        public DbSet<Teacher> Teacher { get; set; }

        public DbSet<Classroom> Classroom { get; set; }

        public DbSet<Subjects> Subjects { get; set; }
        public DbSet<AllocateSubject> AllocateSubject { get; set; }

        public DbSet<AllocateClass> AllocateClass { get; set; }


        
    }
}
