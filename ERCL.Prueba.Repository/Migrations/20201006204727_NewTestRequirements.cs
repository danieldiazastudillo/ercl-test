using Microsoft.EntityFrameworkCore.Migrations;

namespace ERCL.Prueba.Repository.Migrations
{
    public partial class NewTestRequirements : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Pin",
                table: "Cards",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Cards",
                nullable: false,
                oldClrType: typeof(string),
                oldNullable: true);

            migrationBuilder.AddColumn<string>(
                name: "Pan",
                table: "Cards",
                nullable: false,
                defaultValue: "");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Pan",
                table: "Cards");

            migrationBuilder.AlterColumn<string>(
                name: "Pin",
                table: "Cards",
                nullable: true,
                oldClrType: typeof(string));

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Cards",
                nullable: true,
                oldClrType: typeof(string));
        }
    }
}
