using AMR_Study.Context;
using AMR_Study.Mappers;
using AMR_Study.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using AMR_Study.Controllers.Helpers;
using Microsoft.EntityFrameworkCore.Storage;

namespace AMR_Study.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors("bStudioApps")]
    public class HospitalsController(DbContextOptions<ApplicationDbContext> context) : ControllerBase
    {
        private readonly ApplicationDbContext db = new(context);

        [HttpGet("Gen")]
        public async Task<IActionResult> Gen()
        {
            var list = new List<PatientDetails>();
            for (int i = 0; i < 1000; i++)
            {
                list.Add(RandomDataGenerator.GenerateRandomCultureResults());
            }
            db.AddRange(list);
            await db.SaveChangesAsync();
            return Ok(list);
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

    public static class RandomDataGenerator
    {
        private static readonly Random random = new();
        private static readonly string[] possibleResults = ["Resistant", "Sensitive", "Indeterminate"];
        private static readonly string[] possibleGenders = ["Male", "Female"];
        private static readonly string[] possiblePatientTypes = ["OPD", "IPD"];
        private static readonly string[] possibleOutcomes = ["Died", "Discharged"];
        private static readonly string[] drugNames = ["Amoxicillin", "Ciprofloxacin", "Vancomycin"];
        private static readonly string[] diagnoses = ["Pneumonia", "Urinary Tract Infection", "Sepsis"];

        public static PatientDetails GenerateRandomCultureResults()
        {
            var cultureResults = new PatientDetails
            {
                HospitalsID = (short)random.Next(1, 3),
                FolderID = "1234567",
                Gender = possibleGenders[random.Next(possibleGenders.Length)],
                Age = (byte)random.Next(1, 101),
                PatientType = possiblePatientTypes[random.Next(possiblePatientTypes.Length)],
                LoS = (byte)random.Next(0, 22),
                Outcome = possibleOutcomes[random.Next(possibleOutcomes.Length)],
                Diagnoses = new List<Diagnoses> { GenerateRandomDiagnosis() },
                Antibiotics = new List<Antibiotics> { GenerateRandomAntibiotic() },
                Reports = new List<Reports>(),
                DateAdded = DateTime.Now,
                DateDone = DateTime.Now.AddDays(random.Next(1, 10))
            };

            return cultureResults;
        }

        private static List<Reports> GenerateRandomReports(short num)
        {
            var reports = new List<Reports>(num);
            return reports;
        }

        private static Diagnoses GenerateRandomDiagnosis()
        {
            return new Diagnoses
            {
                Diagnosis = diagnoses[random.Next(diagnoses.Length)]
                // ICDCode can be populated similarly if needed.
            };
        }

        private static Antibiotics GenerateRandomAntibiotic()
        {
            return new Antibiotics
            {
                DrugName = drugNames[random.Next(drugNames.Length)]
                // ActualName and DrugClass can be populated similarly if needed.
            };
        }
    }
}
