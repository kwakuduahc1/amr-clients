using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AMR_Study.Migrations
{
    /// <inheritdoc />
    public partial class FolderID : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "FolderID",
                table: "PatientDetails",
                type: "nvarchar(30)",
                maxLength: 30,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "Hospitals",
                keyColumn: "HospitalsID",
                keyValue: (short)1,
                columns: new[] { "Latitude", "Longitude" },
                values: new object[] { 6.686147166m, -1.574256834m });

            migrationBuilder.UpdateData(
                table: "Hospitals",
                keyColumn: "HospitalsID",
                keyValue: (short)2,
                columns: new[] { "Latitude", "Longitude" },
                values: new object[] { 6.651466569m, -1.5867087246m });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "FolderID",
                table: "PatientDetails");

            migrationBuilder.UpdateData(
                table: "Hospitals",
                keyColumn: "HospitalsID",
                keyValue: (short)1,
                columns: new[] { "Latitude", "Longitude" },
                values: new object[] { -1.574256834m, 6.686147166m });

            migrationBuilder.UpdateData(
                table: "Hospitals",
                keyColumn: "HospitalsID",
                keyValue: (short)2,
                columns: new[] { "Latitude", "Longitude" },
                values: new object[] { -1.5867087246m, 6.651466569m });
        }
    }
}
