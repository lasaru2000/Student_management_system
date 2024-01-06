using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class AllocateSubject
    {
        [Key]
        public int AllocateSubID { get; set; }

        public string TeacherName { get; set; }

        public string Subjects { get; set; }
    }

}

