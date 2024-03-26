using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace AMR_Study.Migrations
{
    /// <inheritdoc />
    public partial class UnamesPatch : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Illnesses_Participants_ParticipantsParticipantID",
                table: "Illnesses");

            migrationBuilder.DropIndex(
                name: "IX_Illnesses_ParticipantsParticipantID",
                table: "Illnesses");

            migrationBuilder.DropColumn(
                name: "ParticipantsParticipantID",
                table: "Illnesses");

            migrationBuilder.RenameColumn(
                name: "IllnessesDate",
                table: "Illnesses",
                newName: "IllnessDate");

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Participants",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.AddColumn<int>(
                name: "ParticipantsID",
                table: "Illnesses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.AddColumn<string>(
                name: "UserName",
                table: "Illnesses",
                type: "nvarchar(10)",
                maxLength: 10,
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateIndex(
                name: "IX_Illnesses_ParticipantsID",
                table: "Illnesses",
                column: "ParticipantsID");

            migrationBuilder.AddForeignKey(
                name: "FK_Illnesses_Participants_ParticipantsID",
                table: "Illnesses",
                column: "ParticipantsID",
                principalTable: "Participants",
                principalColumn: "ParticipantID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Illnesses_Participants_ParticipantsID",
                table: "Illnesses");

            migrationBuilder.DropIndex(
                name: "IX_Illnesses_ParticipantsID",
                table: "Illnesses");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Participants");

            migrationBuilder.DropColumn(
                name: "ParticipantsID",
                table: "Illnesses");

            migrationBuilder.DropColumn(
                name: "UserName",
                table: "Illnesses");

            migrationBuilder.RenameColumn(
                name: "IllnessDate",
                table: "Illnesses",
                newName: "IllnessesDate");

            migrationBuilder.AddColumn<int>(
                name: "ParticipantsParticipantID",
                table: "Illnesses",
                type: "int",
                nullable: true);

            migrationBuilder.CreateIndex(
                name: "IX_Illnesses_ParticipantsParticipantID",
                table: "Illnesses",
                column: "ParticipantsParticipantID");

            migrationBuilder.AddForeignKey(
                name: "FK_Illnesses_Participants_ParticipantsParticipantID",
                table: "Illnesses",
                column: "ParticipantsParticipantID",
                principalTable: "Participants",
                principalColumn: "ParticipantID");
        }
    }
}
