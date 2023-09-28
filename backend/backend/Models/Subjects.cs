using System.ComponentModel.DataAnnotations;

namespace backend.Models
{
    public class Subjects
    {
        [Key]
        public int SubjectID { get; set; }
        public string SubjectName { get; set; }
    }
}
