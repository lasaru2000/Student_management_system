using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Student
    {
        public int StudentID { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string ContactPerson { get; set; }
        public string ContactNo { get; set; }
        public string EmailAddress { get; set; }

        [Column(TypeName = "Date")]
        public DateTime DateOfBirth { get; set; }

        public string Classroom { get; set; }

        // Modify the DateOfBirth property to return a formatted string
        [NotMapped] // This attribute ensures that the property is not mapped to a database column
        public string DateOfBirthString => DateOfBirth.ToString("yyyy-MM-dd");
    }
}
