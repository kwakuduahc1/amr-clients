﻿// <auto-generated />
using System;
using AMR_Study.Context;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Infrastructure;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

#nullable disable

namespace AMR_Study.Migrations
{
    [DbContext(typeof(ApplicationDbContext))]
    partial class ApplicationDbContextModelSnapshot : ModelSnapshot
    {
        protected override void BuildModel(ModelBuilder modelBuilder)
        {
#pragma warning disable 612, 618
            modelBuilder
                .HasAnnotation("ProductVersion", "8.0.3")
                .HasAnnotation("Relational:MaxIdentifierLength", 128);

            SqlServerModelBuilderExtensions.UseIdentityColumns(modelBuilder);

            modelBuilder.Entity("AMR_Study.Context.ApplicationUsers", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(36)
                        .HasColumnType("nchar(36)")
                        .IsFixedLength();

                    b.Property<int>("AccessFailedCount")
                        .HasColumnType("int");

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Email")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<bool>("EmailConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("FullName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.Property<bool>("LockoutEnabled")
                        .HasColumnType("bit");

                    b.Property<DateTimeOffset?>("LockoutEnd")
                        .HasColumnType("datetimeoffset");

                    b.Property<string>("NormalizedEmail")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedUserName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("PasswordHash")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PhoneNumber")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("PhoneNumberConfirmed")
                        .HasColumnType("bit");

                    b.Property<string>("SecurityStamp")
                        .HasColumnType("nvarchar(max)");

                    b.Property<bool>("TwoFactorEnabled")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedEmail")
                        .HasDatabaseName("EmailIndex");

                    b.HasIndex("NormalizedUserName")
                        .IsUnique()
                        .HasDatabaseName("UserNameIndex")
                        .HasFilter("[NormalizedUserName] IS NOT NULL");

                    b.ToTable("AspNetUsers", (string)null);
                });

            modelBuilder.Entity("AMR_Study.Models.Antibiotics", b =>
                {
                    b.Property<int>("AntibioticsID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("AntibioticsID"));

                    b.Property<string>("ActualName")
                        .HasMaxLength(75)
                        .HasColumnType("nvarchar(75)");

                    b.Property<string>("DrugClass")
                        .HasMaxLength(75)
                        .HasColumnType("nvarchar(75)");

                    b.Property<string>("DrugName")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("nvarchar(75)");

                    b.Property<int?>("PatientDetailsID")
                        .HasColumnType("int");

                    b.HasKey("AntibioticsID");

                    b.HasIndex("PatientDetailsID");

                    b.ToTable("Antibiotics");
                });

            modelBuilder.Entity("AMR_Study.Models.CultureAntibiotics", b =>
                {
                    b.Property<int>("CultureAntibioticsID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("CultureAntibioticsID"));

                    b.Property<string>("Antibiotic")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("nvarchar(75)");

                    b.Property<string>("GroupName")
                        .IsRequired()
                        .HasMaxLength(50)
                        .HasColumnType("nvarchar(50)");

                    b.HasKey("CultureAntibioticsID");

                    b.ToTable("CultureAntibiotics");
                });

            modelBuilder.Entity("AMR_Study.Models.Diagnoses", b =>
                {
                    b.Property<int>("DiagnosesID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("DiagnosesID"));

                    b.Property<string>("Diagnosis")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("nvarchar(75)");

                    b.Property<string>("ICDCode")
                        .HasMaxLength(75)
                        .HasColumnType("nvarchar(75)");

                    b.Property<int?>("PatientDetailsID")
                        .HasColumnType("int");

                    b.HasKey("DiagnosesID");

                    b.HasIndex("PatientDetailsID");

                    b.ToTable("Diagnoses");
                });

            modelBuilder.Entity("AMR_Study.Models.Hospitals", b =>
                {
                    b.Property<short>("HospitalsID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("smallint");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<short>("HospitalsID"));

                    b.Property<string>("HospitalName")
                        .IsRequired()
                        .HasMaxLength(100)
                        .HasColumnType("nvarchar(100)");

                    b.Property<decimal>("Latitude")
                        .HasColumnType("decimal(22, 18)");

                    b.Property<decimal>("Longitude")
                        .HasColumnType("decimal(22,18)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.HasKey("HospitalsID");

                    b.ToTable("Hospitals");

                    b.HasData(
                        new
                        {
                            HospitalsID = (short)1,
                            HospitalName = "Tech Hospital",
                            Latitude = 6.686147166m,
                            Longitude = -1.574256834m,
                            Type = "University hospital"
                        },
                        new
                        {
                            HospitalsID = (short)2,
                            HospitalName = "Kumasi South Hospital",
                            Latitude = 6.651466569m,
                            Longitude = -1.5867087246m,
                            Type = "Regional hosppital"
                        });
                });

            modelBuilder.Entity("AMR_Study.Models.Illnesses", b =>
                {
                    b.Property<int>("IllnessesID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("IllnessesID"));

                    b.Property<DateTime>("DateAdded")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("IllnessDate")
                        .HasColumnType("datetime2");

                    b.Property<int>("ParticipantsID")
                        .HasColumnType("int");

                    b.Property<bool>("Resolved")
                        .HasColumnType("bit");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.HasKey("IllnessesID");

                    b.HasIndex("ParticipantsID");

                    b.ToTable("Illnesses");
                });

            modelBuilder.Entity("AMR_Study.Models.Organisms", b =>
                {
                    b.Property<int>("OrganismsID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("OrganismsID"));

                    b.Property<string>("Organism")
                        .IsRequired()
                        .HasMaxLength(150)
                        .HasColumnType("nvarchar(150)");

                    b.Property<string>("Type")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.HasKey("OrganismsID");

                    b.ToTable("Organisms");

                    b.HasData(
                        new
                        {
                            OrganismsID = 1,
                            Organism = "Eshchericia Coli",
                            Type = "Gram negative"
                        },
                        new
                        {
                            OrganismsID = 2,
                            Organism = "Klebsiella",
                            Type = "Gram negative"
                        },
                        new
                        {
                            OrganismsID = 3,
                            Organism = "Salmonella spp",
                            Type = "Gram negative"
                        });
                });

            modelBuilder.Entity("AMR_Study.Models.Participants", b =>
                {
                    b.Property<int>("ParticipantID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ParticipantID"));

                    b.Property<byte>("Age")
                        .HasColumnType("tinyint");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasMaxLength(20)
                        .HasColumnType("nvarchar(20)");

                    b.Property<decimal>("Latitude")
                        .HasColumnType("decimal(22,16)");

                    b.Property<string>("Locality")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("nvarchar(75)");

                    b.Property<decimal>("Longitude")
                        .HasColumnType("decimal(22,16)");

                    b.Property<string>("ParticipantName")
                        .IsRequired()
                        .HasMaxLength(75)
                        .HasColumnType("nvarchar(75)");

                    b.Property<string>("UserName")
                        .IsRequired()
                        .HasMaxLength(10)
                        .HasColumnType("nvarchar(10)");

                    b.HasKey("ParticipantID");

                    b.ToTable("Participants");
                });

            modelBuilder.Entity("AMR_Study.Models.PatientDetails", b =>
                {
                    b.Property<int>("PatientDetailsID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("PatientDetailsID"));

                    b.Property<byte>("Age")
                        .HasColumnType("tinyint");

                    b.Property<byte[]>("Concurrency")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("rowversion");

                    b.Property<DateTime>("DateAdded")
                        .HasColumnType("datetime2");

                    b.Property<DateTime>("DateDone")
                        .HasColumnType("datetime2");

                    b.Property<string>("FolderID")
                        .IsRequired()
                        .HasMaxLength(30)
                        .HasColumnType("nvarchar(30)");

                    b.Property<string>("Gender")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<short>("HospitalsID")
                        .HasColumnType("smallint");

                    b.Property<byte>("LoS")
                        .HasColumnType("tinyint");

                    b.Property<string>("Outcome")
                        .IsRequired()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("PatientType")
                        .IsRequired()
                        .HasMaxLength(3)
                        .HasColumnType("nvarchar(3)");

                    b.HasKey("PatientDetailsID");

                    b.HasIndex("HospitalsID");

                    b.ToTable("PatientDetails");
                });

            modelBuilder.Entity("AMR_Study.Models.Reports", b =>
                {
                    b.Property<int>("ReportsID")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("ReportsID"));

                    b.Property<int>("AntibioticsID")
                        .HasColumnType("int");

                    b.Property<int>("OrganismsID")
                        .HasColumnType("int");

                    b.Property<int>("PatientDetailsID")
                        .HasColumnType("int");

                    b.Property<string>("Results")
                        .IsRequired()
                        .HasMaxLength(15)
                        .HasColumnType("nvarchar(15)");

                    b.HasKey("ReportsID");

                    b.HasIndex("AntibioticsID");

                    b.HasIndex("OrganismsID");

                    b.HasIndex("PatientDetailsID");

                    b.ToTable("Reports");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRole", b =>
                {
                    b.Property<string>("Id")
                        .HasMaxLength(36)
                        .HasColumnType("nchar(36)")
                        .IsFixedLength();

                    b.Property<string>("ConcurrencyStamp")
                        .IsConcurrencyToken()
                        .ValueGeneratedOnAddOrUpdate()
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("Discriminator")
                        .IsRequired()
                        .HasMaxLength(21)
                        .HasColumnType("nvarchar(21)");

                    b.Property<string>("Name")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.Property<string>("NormalizedName")
                        .HasMaxLength(256)
                        .HasColumnType("nvarchar(256)");

                    b.HasKey("Id");

                    b.HasIndex("NormalizedName")
                        .IsUnique()
                        .HasDatabaseName("RoleNameIndex")
                        .HasFilter("[NormalizedName] IS NOT NULL");

                    b.ToTable("AspNetRoles", (string)null);

                    b.HasDiscriminator<string>("Discriminator").HasValue("IdentityRole");

                    b.UseTphMappingStrategy();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("RoleId")
                        .IsRequired()
                        .HasColumnType("nchar(36)");

                    b.HasKey("Id");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetRoleClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.Property<int>("Id")
                        .ValueGeneratedOnAdd()
                        .HasColumnType("int");

                    SqlServerPropertyBuilderExtensions.UseIdentityColumn(b.Property<int>("Id"));

                    b.Property<string>("ClaimType")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("ClaimValue")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nchar(36)");

                    b.HasKey("Id");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserClaims", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderKey")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("ProviderDisplayName")
                        .HasColumnType("nvarchar(max)");

                    b.Property<string>("UserId")
                        .IsRequired()
                        .HasColumnType("nchar(36)");

                    b.HasKey("LoginProvider", "ProviderKey");

                    b.HasIndex("UserId");

                    b.ToTable("AspNetUserLogins", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nchar(36)");

                    b.Property<string>("RoleId")
                        .HasColumnType("nchar(36)");

                    b.HasKey("UserId", "RoleId");

                    b.HasIndex("RoleId");

                    b.ToTable("AspNetUserRoles", (string)null);
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.Property<string>("UserId")
                        .HasColumnType("nchar(36)");

                    b.Property<string>("LoginProvider")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Name")
                        .HasColumnType("nvarchar(450)");

                    b.Property<string>("Value")
                        .HasColumnType("nvarchar(max)");

                    b.HasKey("UserId", "LoginProvider", "Name");

                    b.ToTable("AspNetUserTokens", (string)null);
                });

            modelBuilder.Entity("AMR_Study.Context.ApplicationRoles", b =>
                {
                    b.HasBaseType("Microsoft.AspNetCore.Identity.IdentityRole");

                    b.HasDiscriminator().HasValue("ApplicationRoles");
                });

            modelBuilder.Entity("AMR_Study.Models.Antibiotics", b =>
                {
                    b.HasOne("AMR_Study.Models.PatientDetails", null)
                        .WithMany("Antibiotics")
                        .HasForeignKey("PatientDetailsID");
                });

            modelBuilder.Entity("AMR_Study.Models.Diagnoses", b =>
                {
                    b.HasOne("AMR_Study.Models.PatientDetails", null)
                        .WithMany("Diagnoses")
                        .HasForeignKey("PatientDetailsID");
                });

            modelBuilder.Entity("AMR_Study.Models.Illnesses", b =>
                {
                    b.HasOne("AMR_Study.Models.Participants", "Participants")
                        .WithMany("Illnesses")
                        .HasForeignKey("ParticipantsID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.OwnsMany("AMR_Study.Models.PatientDrugs", "PatientDrugs", b1 =>
                        {
                            b1.Property<int>("IllnessesID")
                                .HasColumnType("int");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int");

                            b1.Property<string>("ActualName")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("DrugClass")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("DrugName")
                                .IsRequired()
                                .HasColumnType("nvarchar(max)");

                            b1.Property<string>("ImageUrl")
                                .HasColumnType("nvarchar(max)");

                            b1.Property<bool>("IsPrescribed")
                                .HasColumnType("bit");

                            b1.HasKey("IllnessesID", "Id");

                            b1.ToTable("Illnesses");

                            b1.ToJson("PatientDrugs");

                            b1.WithOwner()
                                .HasForeignKey("IllnessesID");
                        });

                    b.OwnsMany("AMR_Study.Models.Symptoms", "Symptoms", b1 =>
                        {
                            b1.Property<int>("IllnessesID")
                                .HasColumnType("int");

                            b1.Property<int>("Id")
                                .ValueGeneratedOnAdd()
                                .HasColumnType("int");

                            b1.Property<DateTime>("DateResolved")
                                .HasColumnType("datetime2");

                            b1.Property<byte>("Duration")
                                .HasColumnType("tinyint");

                            b1.Property<bool>("Resolved")
                                .HasColumnType("bit");

                            b1.Property<string>("Symptom")
                                .IsRequired()
                                .HasMaxLength(50)
                                .HasColumnType("nvarchar(50)");

                            b1.Property<DateTime>("SymptomDate")
                                .HasColumnType("datetime2");

                            b1.HasKey("IllnessesID", "Id");

                            b1.ToTable("Illnesses");

                            b1.ToJson("Symptoms");

                            b1.WithOwner()
                                .HasForeignKey("IllnessesID");
                        });

                    b.Navigation("Participants");

                    b.Navigation("PatientDrugs");

                    b.Navigation("Symptoms");
                });

            modelBuilder.Entity("AMR_Study.Models.PatientDetails", b =>
                {
                    b.HasOne("AMR_Study.Models.Hospitals", null)
                        .WithMany("PatientDetails")
                        .HasForeignKey("HospitalsID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AMR_Study.Models.Reports", b =>
                {
                    b.HasOne("AMR_Study.Models.CultureAntibiotics", "CultureAntibiotics")
                        .WithMany("Reports")
                        .HasForeignKey("AntibioticsID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AMR_Study.Models.Organisms", "Organisms")
                        .WithMany()
                        .HasForeignKey("OrganismsID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AMR_Study.Models.PatientDetails", "PatientDetails")
                        .WithMany("Reports")
                        .HasForeignKey("PatientDetailsID")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.Navigation("CultureAntibiotics");

                    b.Navigation("Organisms");

                    b.Navigation("PatientDetails");
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityRoleClaim<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserClaim<string>", b =>
                {
                    b.HasOne("AMR_Study.Context.ApplicationUsers", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserLogin<string>", b =>
                {
                    b.HasOne("AMR_Study.Context.ApplicationUsers", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserRole<string>", b =>
                {
                    b.HasOne("Microsoft.AspNetCore.Identity.IdentityRole", null)
                        .WithMany()
                        .HasForeignKey("RoleId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();

                    b.HasOne("AMR_Study.Context.ApplicationUsers", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("Microsoft.AspNetCore.Identity.IdentityUserToken<string>", b =>
                {
                    b.HasOne("AMR_Study.Context.ApplicationUsers", null)
                        .WithMany()
                        .HasForeignKey("UserId")
                        .OnDelete(DeleteBehavior.Cascade)
                        .IsRequired();
                });

            modelBuilder.Entity("AMR_Study.Models.CultureAntibiotics", b =>
                {
                    b.Navigation("Reports");
                });

            modelBuilder.Entity("AMR_Study.Models.Hospitals", b =>
                {
                    b.Navigation("PatientDetails");
                });

            modelBuilder.Entity("AMR_Study.Models.Participants", b =>
                {
                    b.Navigation("Illnesses");
                });

            modelBuilder.Entity("AMR_Study.Models.PatientDetails", b =>
                {
                    b.Navigation("Antibiotics");

                    b.Navigation("Diagnoses");

                    b.Navigation("Reports");
                });
#pragma warning restore 612, 618
        }
    }
}
