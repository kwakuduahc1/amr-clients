using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AMR_Study.Models;

public class OrganismsAddVm
{
    [Required]
    [StringLength(150, MinimumLength = 5)]
    public required string Organism { get; set; }

    [Required, StringLength(30, MinimumLength = 3)]
    public required string Type { get; set; }
}

public class CultureAntibioticsAddVm
{
    [Key, DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int CultureAntibioticsID { get; set; }

    [Required, StringLength(75, MinimumLength = 5)]
    public required string Antibiotic { get; set; }

    [Required]
    [StringLength(50, MinimumLength = 5)]
    public required string GroupName { get; set; }
}

public class PatientDetailsAddVm
{
    [Required]
    [StringLength(30, MinimumLength = 3)]
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
    public required ICollection<DiagnosesAddVm> Diagnoses { get; set; }

    [Required]
    public required ICollection<AntibioticsAddVm> Antibiotics { get; set; }

    [Required]
    public required ICollection<ReportsAddVm> Reports { get; set; }

    public DateTime DateAdded { get; set; }

    public DateTime DateDone { get; set; }
}

public class ReportsAddVm
{
    [Required]
    public int OrganismsID { get; set; }

    [Required]
    public int PatientDetailsID { get; set; }

    [Required]
    public int AntibioticsID { get; set; }

    [Required]
    [StringLength(15, MinimumLength = 5)]
    [AllowedValues("Resistant", "Sensitive", "Indeterminate")]
    public required string Results { get; set; }
}

public class AntibioticsAddVm
{
    [Required]
    [StringLength(75, MinimumLength = 3)]
    public required string DrugName { get; set; }
}

public class DiagnosesAddVm
{
    [Required]
    [StringLength(75, MinimumLength = 3)]
    public required string Diagnosis { get; set; }

    [StringLength(75, MinimumLength = 3)]
    public string? ICDCode { get; set; }
}
