using AMR_Study.Context;
using AMR_Study.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace AMR_Study.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PersonsController(DbContextOptions<ApplicationDbContext> context) : ControllerBase
    {
        private readonly ApplicationDbContext db = new(context);


        [HttpGet("{id:required:minlength(3):alpha}")]
        public async Task<IActionResult> Find(string id)
        {
            var hosp = await db.Participants.FindAsync(id);
            return hosp is null ? NotFound() : Ok(hosp);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Participants part)
        {
            db.Participants.Add(part);
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

        [HttpDelete("{id:required:min(1)}")]
        public async Task<IActionResult> Delete(int id)
        {
            var part = await db.Participants.FindAsync(id);
            if (part is null)
                return BadRequest(new { Message = "The participant was not found" });
            db.Participants.Remove(part);
            await db.SaveChangesAsync();
            return Ok(part);
        }
    }
}
