using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AMR_Study.Migrations
{
    /// <inheritdoc />
    public partial class Relations : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_Reports_OrganismsID",
                table: "Reports",
                column: "OrganismsID");

            migrationBuilder.CreateIndex(
                name: "IX_PatientDetails_HospitalsID",
                table: "PatientDetails",
                column: "HospitalsID");

            migrationBuilder.AddForeignKey(
                name: "FK_PatientDetails_Hospitals_HospitalsID",
                table: "PatientDetails",
                column: "HospitalsID",
                principalTable: "Hospitals",
                principalColumn: "HospitalsID",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Reports_Organisms_OrganismsID",
                table: "Reports",
                column: "OrganismsID",
                principalTable: "Organisms",
                principalColumn: "OrganismsID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PatientDetails_Hospitals_HospitalsID",
                table: "PatientDetails");

            migrationBuilder.DropForeignKey(
                name: "FK_Reports_Organisms_OrganismsID",
                table: "Reports");

            migrationBuilder.DropIndex(
                name: "IX_Reports_OrganismsID",
                table: "Reports");

            migrationBuilder.DropIndex(
                name: "IX_PatientDetails_HospitalsID",
                table: "PatientDetails");
        }
    }
}
