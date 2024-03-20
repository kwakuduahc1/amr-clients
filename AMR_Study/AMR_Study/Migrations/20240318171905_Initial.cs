using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace AMR_Study.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "AspNetRoles",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nchar(36)", fixedLength: true, maxLength: 36, nullable: false),
                    Discriminator = table.Column<string>(type: "nvarchar(21)", maxLength: 21, nullable: false),
                    Name = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoles", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUsers",
                columns: table => new
                {
                    Id = table.Column<string>(type: "nchar(36)", fixedLength: true, maxLength: 36, nullable: false),
                    UserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: false),
                    FullName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    PhoneNumber = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    NormalizedUserName = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    Email = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    NormalizedEmail = table.Column<string>(type: "nvarchar(256)", maxLength: 256, nullable: true),
                    EmailConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    PasswordHash = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    SecurityStamp = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ConcurrencyStamp = table.Column<string>(type: "nvarchar(max)", rowVersion: true, nullable: true),
                    PhoneNumberConfirmed = table.Column<bool>(type: "bit", nullable: false),
                    TwoFactorEnabled = table.Column<bool>(type: "bit", nullable: false),
                    LockoutEnd = table.Column<DateTimeOffset>(type: "datetimeoffset", nullable: true),
                    LockoutEnabled = table.Column<bool>(type: "bit", nullable: false),
                    AccessFailedCount = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUsers", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CultureAntibiotics",
                columns: table => new
                {
                    CultureAntibioticsID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Antibiotic = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false),
                    GroupName = table.Column<string>(type: "nvarchar(50)", maxLength: 50, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CultureAntibiotics", x => x.CultureAntibioticsID);
                });

            migrationBuilder.CreateTable(
                name: "Hospitals",
                columns: table => new
                {
                    HospitalsID = table.Column<short>(type: "smallint", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    HospitalName = table.Column<string>(type: "nvarchar(100)", maxLength: 100, nullable: false),
                    Longitude = table.Column<decimal>(type: "decimal(18,15)", nullable: false),
                    Latitude = table.Column<decimal>(type: "decimal(18,15)", nullable: false),
                    Type = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Hospitals", x => x.HospitalsID);
                });

            migrationBuilder.CreateTable(
                name: "Organisms",
                columns: table => new
                {
                    OrganismsID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Organism = table.Column<string>(type: "nvarchar(150)", maxLength: 150, nullable: false),
                    Type = table.Column<string>(type: "nvarchar(30)", maxLength: 30, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Organisms", x => x.OrganismsID);
                });

            migrationBuilder.CreateTable(
                name: "Participants",
                columns: table => new
                {
                    ParticipantID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    ParticipantName = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    Locality = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    Age = table.Column<byte>(type: "tinyint", nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(20)", maxLength: 20, nullable: false),
                    Longitude = table.Column<decimal>(type: "decimal(18,15)", nullable: false),
                    Latitude = table.Column<decimal>(type: "decimal(18,15)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Participants", x => x.ParticipantID);
                });

            migrationBuilder.CreateTable(
                name: "PatientDetails",
                columns: table => new
                {
                    PatientDetailsID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrganismsID = table.Column<int>(type: "int", nullable: false),
                    HospitalsID = table.Column<short>(type: "smallint", nullable: false),
                    Results = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false),
                    Gender = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    Age = table.Column<byte>(type: "tinyint", nullable: false),
                    PatientType = table.Column<string>(type: "nvarchar(3)", maxLength: 3, nullable: false),
                    LoS = table.Column<byte>(type: "tinyint", nullable: false),
                    Outcome = table.Column<string>(type: "nvarchar(max)", nullable: false),
                    DateAdded = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateDone = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Concurrency = table.Column<byte[]>(type: "rowversion", rowVersion: true, nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PatientDetails", x => x.PatientDetailsID);
                });

            migrationBuilder.CreateTable(
                name: "AspNetRoleClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    RoleId = table.Column<string>(type: "nchar(36)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetRoleClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetRoleClaims_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserClaims",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(type: "nchar(36)", nullable: false),
                    ClaimType = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    ClaimValue = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserClaims", x => x.Id);
                    table.ForeignKey(
                        name: "FK_AspNetUserClaims_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserLogins",
                columns: table => new
                {
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderKey = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    ProviderDisplayName = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    UserId = table.Column<string>(type: "nchar(36)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserLogins", x => new { x.LoginProvider, x.ProviderKey });
                    table.ForeignKey(
                        name: "FK_AspNetUserLogins_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserRoles",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nchar(36)", nullable: false),
                    RoleId = table.Column<string>(type: "nchar(36)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserRoles", x => new { x.UserId, x.RoleId });
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetRoles_RoleId",
                        column: x => x.RoleId,
                        principalTable: "AspNetRoles",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_AspNetUserRoles_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "AspNetUserTokens",
                columns: table => new
                {
                    UserId = table.Column<string>(type: "nchar(36)", nullable: false),
                    LoginProvider = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Name = table.Column<string>(type: "nvarchar(450)", nullable: false),
                    Value = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_AspNetUserTokens", x => new { x.UserId, x.LoginProvider, x.Name });
                    table.ForeignKey(
                        name: "FK_AspNetUserTokens_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateTable(
                name: "Illnesses",
                columns: table => new
                {
                    IllnessesID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    IllnessesDate = table.Column<DateTime>(type: "datetime2", nullable: false),
                    DateAdded = table.Column<DateTime>(type: "datetime2", nullable: false),
                    Resolved = table.Column<bool>(type: "bit", nullable: false),
                    ParticipantsParticipantID = table.Column<int>(type: "int", nullable: true),
                    PatientDrugs = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    Symptoms = table.Column<string>(type: "nvarchar(max)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Illnesses", x => x.IllnessesID);
                    table.ForeignKey(
                        name: "FK_Illnesses_Participants_ParticipantsParticipantID",
                        column: x => x.ParticipantsParticipantID,
                        principalTable: "Participants",
                        principalColumn: "ParticipantID");
                });

            migrationBuilder.CreateTable(
                name: "Antibiotics",
                columns: table => new
                {
                    AntibioticsID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    DrugName = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    ActualName = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: true),
                    DrugClass = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: true),
                    PatientDetailsID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Antibiotics", x => x.AntibioticsID);
                    table.ForeignKey(
                        name: "FK_Antibiotics_PatientDetails_PatientDetailsID",
                        column: x => x.PatientDetailsID,
                        principalTable: "PatientDetails",
                        principalColumn: "PatientDetailsID");
                });

            migrationBuilder.CreateTable(
                name: "Diagnoses",
                columns: table => new
                {
                    DiagnosesID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Diagnosis = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    ICDCode = table.Column<string>(type: "nvarchar(75)", maxLength: 75, nullable: false),
                    PatientDetailsID = table.Column<int>(type: "int", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Diagnoses", x => x.DiagnosesID);
                    table.ForeignKey(
                        name: "FK_Diagnoses_PatientDetails_PatientDetailsID",
                        column: x => x.PatientDetailsID,
                        principalTable: "PatientDetails",
                        principalColumn: "PatientDetailsID");
                });

            migrationBuilder.CreateTable(
                name: "Reports",
                columns: table => new
                {
                    ReportsID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    OrganismsID = table.Column<int>(type: "int", nullable: false),
                    PatientDetailsID = table.Column<int>(type: "int", nullable: false),
                    AntibioticsID = table.Column<int>(type: "int", maxLength: 50, nullable: false),
                    Results = table.Column<string>(type: "nvarchar(15)", maxLength: 15, nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Reports", x => x.ReportsID);
                    table.ForeignKey(
                        name: "FK_Reports_CultureAntibiotics_AntibioticsID",
                        column: x => x.AntibioticsID,
                        principalTable: "CultureAntibiotics",
                        principalColumn: "CultureAntibioticsID",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Reports_PatientDetails_PatientDetailsID",
                        column: x => x.PatientDetailsID,
                        principalTable: "PatientDetails",
                        principalColumn: "PatientDetailsID",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Hospitals",
                columns: new[] { "HospitalsID", "HospitalName", "Latitude", "Longitude", "Type" },
                values: new object[,]
                {
                    { (short)1, "Tech Hospital", 1.2m, 0.8m, "University hospital" },
                    { (short)2, "Kumasi South Hospital", 1.3m, 0.5m, "Regional hosppital" }
                });

            migrationBuilder.InsertData(
                table: "Organisms",
                columns: new[] { "OrganismsID", "Organism", "Type" },
                values: new object[,]
                {
                    { 1, "Eshchericia Coli", "Gram negative" },
                    { 2, "Klebsiella", "Gram negative" },
                    { 3, "Salmonella spp", "Gram negative" }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Antibiotics_PatientDetailsID",
                table: "Antibiotics",
                column: "PatientDetailsID");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetRoleClaims_RoleId",
                table: "AspNetRoleClaims",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "RoleNameIndex",
                table: "AspNetRoles",
                column: "NormalizedName",
                unique: true,
                filter: "[NormalizedName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserClaims_UserId",
                table: "AspNetUserClaims",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserLogins_UserId",
                table: "AspNetUserLogins",
                column: "UserId");

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUserRoles_RoleId",
                table: "AspNetUserRoles",
                column: "RoleId");

            migrationBuilder.CreateIndex(
                name: "EmailIndex",
                table: "AspNetUsers",
                column: "NormalizedEmail");

            migrationBuilder.CreateIndex(
                name: "UserNameIndex",
                table: "AspNetUsers",
                column: "NormalizedUserName",
                unique: true,
                filter: "[NormalizedUserName] IS NOT NULL");

            migrationBuilder.CreateIndex(
                name: "IX_Diagnoses_PatientDetailsID",
                table: "Diagnoses",
                column: "PatientDetailsID");

            migrationBuilder.CreateIndex(
                name: "IX_Illnesses_ParticipantsParticipantID",
                table: "Illnesses",
                column: "ParticipantsParticipantID");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_AntibioticsID",
                table: "Reports",
                column: "AntibioticsID");

            migrationBuilder.CreateIndex(
                name: "IX_Reports_PatientDetailsID",
                table: "Reports",
                column: "PatientDetailsID");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Antibiotics");

            migrationBuilder.DropTable(
                name: "AspNetRoleClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserClaims");

            migrationBuilder.DropTable(
                name: "AspNetUserLogins");

            migrationBuilder.DropTable(
                name: "AspNetUserRoles");

            migrationBuilder.DropTable(
                name: "AspNetUserTokens");

            migrationBuilder.DropTable(
                name: "Diagnoses");

            migrationBuilder.DropTable(
                name: "Hospitals");

            migrationBuilder.DropTable(
                name: "Illnesses");

            migrationBuilder.DropTable(
                name: "Organisms");

            migrationBuilder.DropTable(
                name: "Reports");

            migrationBuilder.DropTable(
                name: "AspNetRoles");

            migrationBuilder.DropTable(
                name: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "Participants");

            migrationBuilder.DropTable(
                name: "CultureAntibiotics");

            migrationBuilder.DropTable(
                name: "PatientDetails");
        }
    }
}
