using AMR_Study.Context;
using AMR_Study.Controllers.Helpers;
using AMR_Study.Models;
using AMR_Study.Models.AuthVm;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

namespace AMR_Study.Controllers
{
    [EnableCors("bStudioApps")]
    [Route("api/[controller]")]
    [ApiController]
    public class AuthController(UserManager<ApplicationUsers> userManager, SignInManager<ApplicationUsers> signInManager, DbContextOptions<ApplicationDbContext> contextOptions, IWebHostEnvironment environment, IAppFeatures app) : ControllerBase
    {
        private readonly UserManager<ApplicationUsers> _userManager = userManager;
        private readonly SignInManager<ApplicationUsers> _signInManager = signInManager;
        public IWebHostEnvironment Env { get; } = environment;
        private readonly ApplicationDbContext db = new(contextOptions);

        //[AllowAnonymous]
        [HttpPost("Login")]
        public async Task<IActionResult> Login([FromBody] LoginVm user)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
            var _user = await _userManager.FindByNameAsync(user.UserName);
            if (_user == null)
                return Unauthorized(new { Message = "Invalid user name or password" });
            if (!await _userManager.CheckPasswordAsync(_user, user.Password))
                return Unauthorized();
            await _signInManager.SignInAsync(_user, false);
            var claims = await _userManager.GetClaimsAsync(_user);
            var token = new AuthHelper(claims, app).Key;
            return Ok(new { Token = token });
        }

        [HttpPost("Register")]
        //[Authorize(Roles = "Power")]
        //[Authorize]
        //[ValidateAntiForgeryToken]
        public async Task<IActionResult> Register([FromBody] ParticipantRegisterVm reg)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
            if (reg.Password != reg.ConfirmPassword)
                return BadRequest(new { Error = "The confirmation password must match" });
            ApplicationUsers user = new RegisterMapper().ToUser(reg.ToRegister());
            var result = await _userManager.CreateAsync(user, user.Password);
            if (!result.Succeeded)
                return BadRequest(new { Message = result.Errors.First().Description });
            await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Name, user.FullName));
            if (reg.Role != null)
                await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, reg.Role));
            foreach (var x in reg.PhoneNumber)
                await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.MobilePhone, x));
            if (reg.Locality != null)
                await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Locality, reg.Locality));
            await _userManager.AddClaimAsync(user, new Claim("FullName", reg.FullName));
            await _userManager.AddClaimAsync(user, new Claim("UsersID", user.Id));
            await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Name, reg.UserName));
            db.Participants.Add(reg.ToParticipants());
            await db.SaveChangesAsync();
            return Created("", new { user.UserName, user.PhoneNumber, user.Email, user.Id });
        }

        //[HttpPost("Approve")]
        ////[Authorize(Roles = "Power")]
        ////[Authorize]
        ////[ValidateAntiForgeryToken]
        //public async Task<IActionResult> Approve([FromBody] ApprovalVm reg)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });

        //    var user = await _userManager.FindByIdAsync(reg.ID);
        //    await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, "User"));
        //    user.TeamsID = reg.TeamsID;
        //    user.PhoneNumberConfirmed = true;
        //    user.EmailConfirmed = true;
        //    var claims = await _userManager.GetClaimsAsync(user);
        //    if (!claims.Any(o => o.Value == "Teams"))
        //        await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, "Teams"));
        //    await db.SaveChangesAsync();
        //    return Created("", new { user.UserName, user.PhoneNumber, user.Email, user.Id });
        //}

        [HttpPost("SignOut")]
        [Authorize]
        public new async Task<IActionResult> SignOut()
        {
            await _signInManager.SignOutAsync();
            return Accepted();
        }
    }
}