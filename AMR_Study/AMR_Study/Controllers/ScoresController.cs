using AMR_Study.Context;
using Dapper;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;

namespace AMR_Study.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("bStudioApps")]

    public class ScoresController(DbContextOptions<ApplicationDbContext> context) : ControllerBase
    {
        private readonly ApplicationDbContext db = new(context);

        [HttpGet("Diagnosis/{hosp:int:required:min(1)}/{score:double:required}/{diag:required}")]
        public async Task<IEnumerable> Diagnosis(int hosp, float score, string diag)
        {
            Console.WriteLine(score);
            const string qry = @"SELECT        Organism, Antibiotic, Total, CONCAT(CAST(Score * 100 AS decimal(5, 2)), '%') AS Sensitivity
                                FROM            dbo.fnSensitivityByDiag(@diag, @hosp)
                                WHERE        (Score >= @score)
                                ORDER BY Sensitivity";
            return await db.Database.GetDbConnection().QueryAsync<SensitivityResult>(qry, param: new { hosp, score, diag});
        }
    }

    public class SensitivityResult
    {
        public string? Organism { get; set; }
        public string? Antibiotic { get; set; }
        public int Total { get; set; }
        public string? Sensitivity { get; set; }
    }

}
