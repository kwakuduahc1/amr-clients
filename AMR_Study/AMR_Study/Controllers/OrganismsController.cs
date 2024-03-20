using AMR_Study.Context;
using AMR_Study.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace AMR_Study.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("bStudioApps")]
    [ApiController]
    public class OrganismsController(DbContextOptions<ApplicationDbContext> context) : ControllerBase
    {
        private readonly ApplicationDbContext db = new(context);

        [HttpGet]
        public async Task<IEnumerable> List() => await db.Organisms.ToListAsync();

        [HttpGet("{id:required:min(1)}")]
        public async Task<IActionResult> Find(int id)
        {
            var hosp = await db.Organisms.FindAsync(id);
            return hosp is null ? NotFound() : Ok(hosp);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] Organisms org)
        {
            if (!await db.Organisms.AnyAsync(x => x.Organism == org.Organism))
                return BadRequest(new { Message = "The organism name exists" });
            db.Organisms.Add(org);
            await db.SaveChangesAsync();
            return Ok(org);
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromBody] Organisms org)
        {
            db.Organisms.Update(org);
            await db.SaveChangesAsync();
            return Ok(org);
        }
    }
}
