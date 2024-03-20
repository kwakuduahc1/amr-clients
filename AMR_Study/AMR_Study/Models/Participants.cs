using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AMR_Study.Models
{
    public class Participants
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ParticipantID { get; set; }

        [Required]
        [StringLength(75, MinimumLength = 3)]
        public required string ParticipantName { get; set; }

        [Required, StringLength(75, MinimumLength = 3)]
        public required string Locality { get; set; }

        [Required]
        public byte Age { get; set; }

        [Required]
        [StringLength(20, MinimumLength = 3)]
        [AllowedValues("Male", "Female", "Prefer not to say")]
        public required string Gender { get; set; }

        [Required]
        [Column(TypeName = "decimal(22,16)")]
        public decimal Longitude { get; set; }

        [Required]
        [Column(TypeName = "decimal(22,16)")]
        public decimal Latitude { get; set; }

        public virtual ICollection<Illnesses>? Illnesses { get; set; }
    }

    public class Illnesses
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int IllnessesID { get; set; }

        [Required]
        public required DateTime IllnessesDate { get;set; }

        public DateTime DateAdded { get;set; }

        [Required]
        public required ICollection<Symptoms> Symptoms { get; set; }

        public required ICollection<PatientDrugs> PatientDrugs { get; set; }

        [Required]
        [DefaultValue(false)]
        public bool Resolved { get; set; }
    }

    public class Symptoms
    {
        [Required]
        [StringLength(50)]
        public required string Symptom { get; set; }

        [Required]
        public DateTime SymptomDate { get; set; }

        [DefaultValue(false)]
        public bool Resolved { get; set; }

        public DateTime DateResolved { get; set; }

        [Required]
        public byte Duration { get; set; }
    }

    public class PatientDrugs
    {
        [Required]
        public required string DrugName { get; set; }

        [DefaultValue(false), Required]
        public bool IsPrescribed { get; set; }

        public string? ActualName { get; set; }

        public string? DrugClass { get; set; }

        public string? ImageUrl { get; set; }
    }
}
