using ERCL.Prueba.Application;
using ERCL.Prueba.WebApi.Model.Card;
using Microsoft.AspNetCore.Mvc;
using System.Text;

namespace ERCL.Prueba.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CardController : ControllerBase
    {
        public CardService CardService { get; }

        public CardController(CardService cardService)
        {
            CardService = cardService;
        }

        [HttpPost]
        public void Post([FromBody] CreateCardModel card)
        {
            CardService.Create(card.Name, card.Pan);
        }


        [HttpGet("action/download")]
        public FileResult Download()
        {
            return File(Encoding.ASCII.GetBytes(CardService.CsvEncriptedFile()), "text/csv", "encriptedfile.csv");
        }
    }
}
