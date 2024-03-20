using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AMR_Study.Migrations
{
    /// <inheritdoc />
    public partial class PosVals : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Longitude",
                table: "Participants",
                type: "decimal(22,16)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,15)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Latitude",
                table: "Participants",
                type: "decimal(22,16)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,15)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Longitude",
                table: "Hospitals",
                type: "decimal(22,18)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,15)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Latitude",
                table: "Hospitals",
                type: "decimal(22,18)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(18,15)");

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

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "Longitude",
                table: "Participants",
                type: "decimal(18,15)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(22,16)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Latitude",
                table: "Participants",
                type: "decimal(18,15)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(22,16)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Longitude",
                table: "Hospitals",
                type: "decimal(18,15)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(22,18)");

            migrationBuilder.AlterColumn<decimal>(
                name: "Latitude",
                table: "Hospitals",
                type: "decimal(18,15)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(22,18)");

            migrationBuilder.UpdateData(
                table: "Hospitals",
                keyColumn: "HospitalsID",
                keyValue: (short)1,
                columns: new[] { "Latitude", "Longitude" },
                values: new object[] { 1.2m, 0.8m });

            migrationBuilder.UpdateData(
                table: "Hospitals",
                keyColumn: "HospitalsID",
                keyValue: (short)2,
                columns: new[] { "Latitude", "Longitude" },
                values: new object[] { 1.3m, 0.5m });
        }
    }
}
