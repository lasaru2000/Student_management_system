using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class AllocateClass
    {
        [Key]
        public int AllocateClassID { get; set; }
        public string TeacherName { get; set; }

        public string Classrooms { get; set; }
    }
}
