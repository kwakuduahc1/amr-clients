using AMR_Study.Context;
using AMR_Study.Mappers;
using AMR_Study.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using AMR_Study.Controllers.Helpers;
using Microsoft.EntityFrameworkCore.Storage;
using Dapper;

namespace AMR_Study.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("bStudioApps")]
    public class HospitalsController(DbContextOptions<ApplicationDbContext> context) : ControllerBase
    {
        private readonly ApplicationDbContext db = new(context);

        [HttpGet("Diagnoses/{id:int:required:min(1)}")]
        public async Task<IEnumerable> Diagnoses(int id)
        {
            const string qry = @"SELECT DISTINCT Diagnosis
                                    FROM            Diagnoses
                                    WHERE        (PatientDetailsID IN
                                    (SELECT        PatientDetailsID
                                    FROM            PatientDetails
                                    WHERE        (HospitalsID = @id)))";
            return await db.Database.GetDbConnection()
                .QueryAsync<HospitalDiagnosisVm>(qry, param: new { id });
        }

        [HttpGet]
        public async Task<IEnumerable> List() => await db.Hospitals.ToListAsync();

        [HttpGet("{id:int:required:min(1)}")]
        public async Task<IActionResult> Find(short id)
        {
            var hosp = await db.Hospitals.FindAsync(id);
            return hosp is null ? NotFound() : Ok(hosp);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromBody] AddHospitalVm hosp)
        {
            if (await db.Hospitals.AnyAsync(x => x.HospitalName == hosp.HospitalName))
                return BadRequest(new { Message = "The hospital name exists" });
            var _hosp = new AddHospitalMp().ToHospital(hosp);
            db.Hospitals.Add(_hosp);
            await db.SaveChangesAsync();
            return Ok(_hosp);
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromBody] Hospitals hosp)
        {
            if (!await db.Hospitals.AnyAsync(x => x.HospitalName == hosp.HospitalName))
                return BadRequest(new { Message = "The hospital name exists" });
            db.Hospitals.Update(hosp);
            await db.SaveChangesAsync();
            return Ok(hosp);
        }
    }

    public class HospitalDiagnosisVm
    {
        public required string Diagnosis{ get; set; }
    }

}
