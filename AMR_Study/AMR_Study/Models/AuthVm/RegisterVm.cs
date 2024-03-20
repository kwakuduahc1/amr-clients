using AMR_Study.Context;
using Riok.Mapperly.Abstractions;
using System.ComponentModel.DataAnnotations;

namespace AMR_Study.Models.AuthVm
{
    public class RegisterVm
    {
        [Required]
        [StringLength(20)]
        public required string UserName { get; set; }

        [Required]
        [AllowedValues(["Mr.", "Mrs.", "Dr.", "Ms.", "Prof."])]
        [StringLength(10, MinimumLength = 3)]
        public required string Title { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 6)]
        public required string Password { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 6)]
        public required string ConfirmPassword { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 5)]
        public required string FullName { get; set; }

        [Required]
        public required string[] PhoneNumber { get; set; }
    }

    [Mapper]
    public partial class RegisterMapper
    {
        public partial ApplicationUsers ToUser(RegisterVm registerVm);
    }
}
