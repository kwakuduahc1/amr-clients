using AMR_Study.Context;
using Riok.Mapperly.Abstractions;
using System.ComponentModel.DataAnnotations;

namespace AMR_Study.Models.AuthVm
{
    public class RegisterVm
    {
        [Required]
        [StringLength(20)]
        public required string UserName {  get; set; }

        [Required]
        [StringLength(15, MinimumLength = 6)]
        public required string Password { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 6)]
        public required string ConfirmPassword { get; set; }

        [Required]
        [StringLength(50, MinimumLength = 5)]
        public required string FullName { get; set; }

        [StringLength(30, MinimumLength =3)]
        public string? Role {  get; set; }

        [Required]
        public required string[] PhoneNumber { get; set; }
    }

    [Mapper]
    public partial class RegisterMapper
    {
        public partial ApplicationUsers ToUser(RegisterVm registerVm);
    }
}
