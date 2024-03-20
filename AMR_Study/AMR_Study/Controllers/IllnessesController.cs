using AMR_Study.Context;
using AMR_Study.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AMR_Study.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class IllnessesController(DbContextOptions<ApplicationDbContext> context) : ControllerBase
    {
        private readonly ApplicationDbContext db = new(context);


        [HttpGet("{id:required:minlength(3):int}")]
        public async Task<IActionResult> Find(int id)
        {
            var hosp = await db.Illnesses.FindAsync(id);
            return hosp is null ? NotFound() : Ok(hosp);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Illnesses part)
        {
            db.Illnesses.Add(part);
            await db.SaveChangesAsync();
            return Ok(part);
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromBody] Participants part)
        {
            db.Participants.Update(part);
            await db.SaveChangesAsync();
            return Ok(part);
        }
    }
}
