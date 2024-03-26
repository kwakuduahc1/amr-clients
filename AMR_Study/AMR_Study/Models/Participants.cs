using AMR_Study.Models.AuthVm;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace AMR_Study.Models
{
    public class ParticipantRegisterVm
    {
        [Required]
        [StringLength(20)]
        public required string UserName { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 6)]
        public required string Password { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 6)]
        //[]
        public required string ConfirmPassword { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 5)]
        public required string FullName { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        public required string Role { get; set; }

        [Required]
        public required string[] PhoneNumber { get; set; }

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

        public RegisterVm ToRegister()
        {
            return new RegisterVm()
            {
                ConfirmPassword = ConfirmPassword,
                FullName = FullName,
                Password = Password,
                PhoneNumber = PhoneNumber,
                UserName = PhoneNumber[0],
                Role = Role,
            };
        }

        public Participants ToParticipants()
        {
            return new Participants()
            {
                Gender = Gender,
                Locality = Locality,
                ParticipantName = ParticipantName,
                Age = Age,
                Latitude = Latitude,
                UserName = PhoneNumber[0],
                Longitude = Longitude,
            };
        }
    }
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
        [StringLength(10, MinimumLength = 10)]
        public string? UserName { get; set; }

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
        [StringLength(10, MinimumLength =10)]
        public string? UserName { get; set; }

        [Required]
        public int ParticipantsID { get; set; }

        [Required]
        public required DateTime IllnessDate { get; set; }

        public DateTime DateAdded { get; set; }

        [Required]
        public required ICollection<Symptoms> Symptoms { get; set; }

        public required ICollection<PatientDrugs> PatientDrugs { get; set; }

        [Required]
        [DefaultValue(false)]
        public bool Resolved { get; set; }

        public virtual Participants? Participants { get; set; }
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
