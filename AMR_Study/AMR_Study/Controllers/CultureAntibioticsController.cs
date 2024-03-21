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

    public class CultureAntibioticsController(DbContextOptions<ApplicationDbContext> context) : ControllerBase
    {
        private readonly ApplicationDbContext db = new(context);

        [HttpGet(Order = 0)]
        [ResponseCache(Duration = 8600, Location = ResponseCacheLocation.Any, NoStore = true)]
        public async Task<IEnumerable> List() => await db.CultureAntibiotics.Select(x=>new {x.CultureAntibioticsID, x.Antibiotic, x.GroupName } ).ToListAsync();

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] CultureAntibiotics antibiotic)
        {
            db.CultureAntibiotics.Add(antibiotic);
            await db.SaveChangesAsync();
            return Ok(antibiotic);
        }
    }
}
