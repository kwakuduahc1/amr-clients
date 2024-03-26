using AMR_Study.Context;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace AMR_Study.Controllers
{
    [Route("api/[controller]")]
    [EnableCors("bStudioApps")]
    [ApiController]
    public class MyRecordsController(DbContextOptions<ApplicationDbContext> dbContext) : ControllerBase
    {
        private readonly ApplicationDbContext db = new(dbContext);

        [HttpGet("{id:int:required}")]
        public async Task<IEnumerable> MyRecords(int id, byte num = 20)
        {
            return await db.Illnesses.Where(x => x.ParticipantsID == id)
                .OrderBy(x => x.IllnessDate)
                .Take(num)
                .ToListAsync();
        }
    }
}
