using Riok.Mapperly.Abstractions;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using AMR_Study.Models;

namespace AMR_Study.Mappers
{
    public class AddHospitalVm
    {
        [Required, StringLength(100, MinimumLength = 3)]
        public required string HospitalName { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,15)")]
        public decimal Longitude { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 15)")]
        public decimal Latitude { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        [AllowedValues("Government", "CHAG", "Others")]
        public required string Type { get; set; }
    }

    [Mapper]
    public partial class AddHospitalMp
    {
        public partial Hospitals ToHospital(AddHospitalVm hosp);
    }

    public class EditHospitalVm
    {
        [Required]
        public short HospitalsID { get; set; }

        [Required, StringLength(100, MinimumLength = 3)]
        public required string HospitalName { get; set; }

        [Required]
        [Column(TypeName = "decimal(18,15)")]
        public decimal Longitude { get; set; }

        [Required]
        [Column(TypeName = "decimal(18, 15)")]
        public decimal Latitude { get; set; }

        [Required]
        [StringLength(30, MinimumLength = 3)]
        [AllowedValues("Government", "CHAG", "Others")]
        public required string Type { get; set; }
    }

    [Mapper]
    public partial class EditHospitalMp
    {
        public partial Hospitals ToHospital(EditHospitalVm hosp);
    }
}
