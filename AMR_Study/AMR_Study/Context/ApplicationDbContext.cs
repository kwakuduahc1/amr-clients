using AMR_Study.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace AMR_Study.Context
{
    public class ApplicationDbContext(DbContextOptions<ApplicationDbContext> dbContextOptions) : IdentityDbContext<ApplicationUsers>(dbContextOptions)
    {
        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Organisms>(o => o.HasData(
                new Organisms { Organism = "Eshchericia Coli", Type = "Gram negative", OrganismsID = 1 },
                new Organisms { Organism = "Klebsiella", Type = "Gram negative", OrganismsID = 2 },
                new Organisms { Organism = "Salmonella spp", Type = "Gram negative", OrganismsID = 3 }
            ));
            builder.Entity<ApplicationUsers>(x =>
            {
                x.Property(p => p.Id).HasMaxLength(36).IsFixedLength();
                x.Property(p => p.UserName).HasMaxLength(20);
                x.Property(p => p.NormalizedUserName).HasMaxLength(100);
                x.Property(p => p.Email).HasMaxLength(100);
                x.Property(p => p.NormalizedEmail).HasMaxLength(100);
                x.Property(p => p.ConcurrencyStamp).IsRowVersion().IsConcurrencyToken();
                //x.OwnsOne(e => e.PhoneNumber)
                //.ToJson();
            });

            builder.Entity<ApplicationRoles>(x =>
            {
                x.Property(p => p.Id).HasMaxLength(36).IsFixedLength(true);
                x.Property(p => p.Name).HasMaxLength(50);
                x.Property(p => p.NormalizedName).HasMaxLength(50);
                x.Property(p => p.ConcurrencyStamp).IsRowVersion().IsConcurrencyToken();//.HasValueGenerator(GuidGenerator)
            });

            builder.Entity<PatientDetails>(x =>                //x.OwnsMany(m => m.Antibiotics).ToJson();
                //x.OwnsMany(m => m.Diagnoses).ToJson();
            {

            });

            builder.Entity<Hospitals>(h => h.HasData(
                new
                {
                    HospitalName = "Tech Hospital",
                    Type = "University hospital",
                    HospitalsID = (short)1,
                    Latitude = 6.686147166M,
                    Longitude = -1.574256834M,
                },
                new
                {
                    HospitalName = "Kumasi South Hospital",
                    Type = "Regional hosppital",
                    HospitalsID = (short)2,
                    Latitude =  6.651466569M,
                    Longitude = -1.5867087246M,
                }
                ));
            //builder.Entity<PatientDrugs>(x => x.HasNoKey());
            builder.Entity<Illnesses>(x => x.OwnsMany(m => m.PatientDrugs).ToJson());
            builder.Entity<Illnesses>(x => x.OwnsMany(m => m.Symptoms).ToJson());
            base.OnModelCreating(builder);
        }

        public virtual DbSet<Hospitals> Hospitals { get; set; }

        public virtual DbSet<PatientDetails> PatientDetails { get; set; }

        public virtual DbSet<Organisms> Organisms { get; set; }

        public virtual DbSet<Participants> Participants { get; set; }

        public virtual DbSet<Illnesses> Illnesses { get; set; }

        public virtual DbSet<CultureAntibiotics> CultureAntibiotics { get; set; }

        public virtual DbSet<Antibiotics> Antibiotics { get; set; }

        public virtual DbSet<Diagnoses> Diagnoses { get; set; }

    }
}
