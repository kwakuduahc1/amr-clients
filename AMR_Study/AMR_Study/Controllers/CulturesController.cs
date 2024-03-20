using AMR_Study.Context;
using AMR_Study.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace AMR_Study.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("bStudioApps")]

    public class CulturesController(DbContextOptions<ApplicationDbContext> context) : ControllerBase
    {
        private readonly ApplicationDbContext db = new(context);

        [HttpGet("{id:int:required:min(1)}", Order = 0)]
        public async Task<IEnumerable> List(int id) => await db.PatientDetails.Where(x => x.HospitalsID == id).ToListAsync();

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] PatientDetails culture)
        {
                culture.DateAdded = DateTime.UtcNow;
                db.PatientDetails.Add(culture);
            await db.SaveChangesAsync();
            return Ok(culture);
        }
    }
}
