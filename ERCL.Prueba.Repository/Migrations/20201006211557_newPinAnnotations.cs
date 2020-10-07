using Microsoft.EntityFrameworkCore.Migrations;

namespace ERCL.Prueba.Repository.Migrations
{
    public partial class newPinAnnotations : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Pin",
                table: "Cards",
                maxLength: 4,
                nullable: false,
                oldClrType: typeof(string));
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Pin",
                table: "Cards",
                nullable: false,
                oldClrType: typeof(string),
                oldMaxLength: 4);
        }
    }
}
