using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AppointmentsManager.Data.Models
{
    public class Appointment
    {
        [Key]
        public int ID { get; set; }

        [MaxLength(50), Column(TypeName = "nvarchar(50)")]
        public string Title { get; set; } = "Title";

        [MaxLength(300), Column(TypeName = "nvarchar(300)")]
        public string Description { get; set; } = "Description";

        public DateTime CreatedDate { get; set; } = DateTime.Now;
        public DateTime ModifiedDate { get; set; } = DateTime.Now;

        public DateTime Date { get; set;} = DateTime.Now;

        [MaxLength(50), Column(TypeName = "nvarchar(50)")]
        public string Address { get; set; } = "Address";

        [MaxLength(10), Column(TypeName ="nvarchar(10)")]
        public string Time { get; set; } = "14:00";

        public bool Done { get; set; } = false;
        public bool Delete { get; set; } = false;

        public byte LevelOfImportance { get; set; } = 2;
    }
}
