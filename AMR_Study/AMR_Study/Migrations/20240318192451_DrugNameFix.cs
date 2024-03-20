using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AMR_Study.Migrations
{
    /// <inheritdoc />
    public partial class DrugNameFix : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "OrganismsID",
                table: "PatientDetails");

            migrationBuilder.DropColumn(
                name: "Results",
                table: "PatientDetails");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "OrganismsID",
                table: "PatientDetails",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "Results",
                table: "PatientDetails",
                type: "nvarchar(15)",
                maxLength: 15,
                nullable: false,
                defaultValue: "");
        }
    }
}
