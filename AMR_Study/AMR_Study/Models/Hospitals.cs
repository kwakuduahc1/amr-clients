using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AMR_Study.Models
{
    public class Hospitals
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public short HospitalsID { get; set; }

        [Required, StringLength(100, MinimumLength = 3)]
        public required string HospitalName { get; set; }

        [Required]
        [Column(TypeName = "decimal(22,18)")]
        //[Range(0.3, 12.0)]
        public decimal Longitude { get; set; }

        [Required]
        [Column(TypeName = "decimal(22, 18)")]
        //[Range(0.3, 12.0)]
        public decimal Latitude { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        [AllowedValues("Government", "CHAG", "Others")]
        public required string Type { get; set; }

        public virtual ICollection<PatientDetails>? PatientDetails { get; set; }
    }

    public class Organisms
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrganismsID { get; set; }

        [Required]
        [StringLength(150, MinimumLength = 5)]
        public required string Organism { get; set; }

        [Required, StringLength(30, MinimumLength = 3)]
        public required string Type { get; set; }
    }

    public class CultureAntibiotics
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CultureAntibioticsID { get; set; }

        [Required, StringLength(75, MinimumLength = 5)]
        public required string Antibiotic { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 5)]
        public required string GroupName { get; set; }

        public required virtual ICollection<Reports> Reports { get; set; }
    }

    public class PatientDetails
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int PatientDetailsID { get; set; }

        [Required]
        [StringLength(30, MinimumLength =3)]
        public required string FolderID { get; set; }

        [Required]
        public short HospitalsID { get; set; }

        [Required]
        [AllowedValues("Male", "Female")]
        public required string Gender { get; set; }

        [Required]
        [Range(1, 100)]
        public byte Age { get; set; }

        [Required]
        [AllowedValues("OPD", "IPD")]
        [StringLength(3, MinimumLength = 3)]
        public required string PatientType { get; set; }

        [Required]
        [Range(0, 200)]
        public byte LoS { get; set; }

        [Required]
        [AllowedValues("Died", "Discharged")]
        public required string Outcome { get; set; }

        [Required]
        public required ICollection<Diagnoses> Diagnoses { get; set; }

        [Required]
        public required ICollection<Antibiotics> Antibiotics { get; set; }

        [Required]
        public required ICollection<Reports> Reports { get; set; }

        public DateTime DateAdded { get; set; }

        public DateTime DateDone { get; set; }

        [Timestamp, ConcurrencyCheck]
        public byte[]? Concurrency { get; set; }
    }

    public class Reports
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int ReportsID { get; set; }

        [Required]
        [ForeignKey(nameof(Organisms))]
        public int OrganismsID { get; set; }

        [Required]
        public int PatientDetailsID { get; set; }

        [Required]
        [ForeignKey(nameof(CultureAntibiotics))]
        public int AntibioticsID { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 5)]
        [AllowedValues("Resistant", "Sensitive", "Indeterminate")]
        public required string Results { get; set; }

        public virtual PatientDetails? PatientDetails { get; set; }

        public virtual CultureAntibiotics? CultureAntibiotics { get; set; }

        public virtual Organisms? Organisms { get; set; }
    }

    public class Antibiotics
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int AntibioticsID { get; set; }

        [Required]
        [StringLength(75, MinimumLength = 3)]
        public required string DrugName { get; set; }

        [StringLength(75, MinimumLength = 3)]
        public string? ActualName { get; set; }

        [StringLength(75, MinimumLength = 3)]
        public string? DrugClass { get; set; }
    }

    public class Diagnoses
    {
        [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int DiagnosesID { get; set; }

        [Required]
        [StringLength(75, MinimumLength = 3)]
        public required string Diagnosis { get; set; }

        [StringLength(75, MinimumLength = 3)]
        public string? ICDCode { get; set; }
    }
}
