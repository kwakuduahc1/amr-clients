using System.ComponentModel.DataAnnotations;

namespace AMR_Study.Models.AuthVm
{
    public class LoginVm
    {
        [Required]
        [StringLength(20)]
        public string UserName { get; set; }

        [Required]
        [StringLength(15, MinimumLength = 6)]
        public string Password { get; set; }
    }
}
