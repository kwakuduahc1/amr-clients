using System.Collections;
using System.Security.Claims;
using AMR_Study.Context;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AMR_Study.Controllers
{
    //[AutoValidateAntiforgeryToken]
    //[Authorize(Roles = "Power")]

    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("bStudioApps")]
    public class UsersController(UserManager<ApplicationUsers> userManager, DbContextOptions<ApplicationDbContext> options) : ControllerBase
    {
        readonly ApplicationDbContext db = new(options);
        private readonly UserManager<ApplicationUsers> _userManager = userManager;

        [HttpGet("{id:guid:required}")]
        public async Task<IActionResult> Find(string id)
        {
            var user = await db.Users.Where(x => x.Id == id).Select(x => new { usersID = x.Id, x.UserName }).SingleOrDefaultAsync();
            return user == null ? NotFound() : Ok(user);
        }


        [HttpGet]
        public async Task<IEnumerable> List()
        {
            return await db.Users.Select(x => new
            {
                x.UserName,
                x.Id,
                //x.FullName,
                x.PhoneNumber,
                x.Email,
                //x.
            }).ToListAsync();
        }

        //[HttpGet]
        //public async Task<IEnumerable> Roles(string id) => await db.UserClaims.Where(x => x.UserId == id).Select(x => new { x.UserId, x.Id, x.ClaimValue, x.ClaimType }).ToListAsync();

        [HttpPost]
        public async Task<IActionResult> AddToRole([FromBody] URoles urole)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
            var user = await _userManager.FindByIdAsync(urole.ID);
            if (user == null)
                return BadRequest(new { Message = "The user was not found" });
            await _userManager.AddClaimAsync(user, new Claim(ClaimTypes.Role, urole.Role));
            return Accepted("");
        }

        [HttpPost("Confirm")]
        public async Task<IActionResult> Confirm([FromBody] string id)
        {
            if (!ModelState.IsValid)
                return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
            var _user = await db.Users.FindAsync(id);
            if (_user is null)
                return BadRequest(new { Message = "User not found" });
            _user.PhoneNumberConfirmed = true;
            return Ok(id);
        }
        //public async Task<IActionResult> RemoveRole([FromBody] URoles urole)
        //{
        //    if (!ModelState.IsValid)
        //        return BadRequest(new { Error = "Invalid data was submitted", Message = ModelState.Values.First(x => x.Errors.Count > 0).Errors.Select(t => t.ErrorMessage).First() });
        //    var user = await _userManager.FindByIdAsync(urole.ID);
        //    if (user == null)
        //        return BadRequest(new { Message = "The user was not found" });
        //    var claims = await _userManager.GetClaimsAsync(user);
        //    var ucms = claims.FirstOrDefault(x => x.Value == urole.Role);
        //    await _userManager.RemoveClaimAsync(user, ucms);
        //    return Accepted();
        //}

        [HttpDelete]
        public async Task<IActionResult> RemoveUser(string id)
        {
            var user = await _userManager.FindByIdAsync(id);
            if (user == null)
                return BadRequest(new { Message = "The user was not found" });
            await _userManager.DeleteAsync(user);
            return Accepted();
        }
    }
}
