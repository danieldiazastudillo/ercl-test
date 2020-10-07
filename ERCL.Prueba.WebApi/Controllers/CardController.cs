using ERCL.Prueba.Application;
using ERCL.Prueba.WebApi.Model.Card;
using Microsoft.AspNetCore.Mvc;
using System.Text;
using System;

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

        [HttpPost("new")]
        public IActionResult PostNewCard([FromBody] CreateCardModel card)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            CardService.Create(card.Name, card.Pan, card.Pin);

            return Ok();
        }


        /// <summary>
        /// Retrieves ALL Cards 
        /// </summary>
        /// <returns></returns>
        [HttpGet("all")]
        public IActionResult GetAllCards()
        {
            var cards = CardService.GetAllCards();
            return Ok(cards);
        }


        /// <summary>
        /// Returns a single Card entity by GUID
        /// </summary>
        /// <param name="id">GUID of a card</param>
        /// <returns></returns>
        [HttpGet("id/{id:guid}")]
        public IActionResult GetCardByGuid(Guid id)
        {

            // Checks for argument
            if (id == Guid.Empty)
            {
                return BadRequest("Card ID not provided");
            }

            // Gets entity using repository
            var card = CardService.GetCardByGuid(id);
            
            if (card == null)
            {
                return NotFound($"Card with ID {id} not found!");
            }

            return Ok(card);
        }


        /// <summary>
        /// Updates password for a given Card GUID
        /// </summary>
        /// <param name="id">Card GUID</param>
        /// <param name="pin">New Card PIN</param>
        /// <returns>Patched Card Entity</returns>
        [HttpPatch("update/pin/{id}")]
        public IActionResult UpdateCardPassword(Guid id, [FromBody] PinDTO model)
        {
            if (id == Guid.Empty || string.IsNullOrEmpty(model.Pin))
            {
                return BadRequest("Invalid arguments. Check request parameters.");
            }

            var card = CardService.GetCardByGuid(id);

            if (card == null)
            {
                return NotFound($"Card with ID {id} not found");
            }

            card.Pin = model.Pin;
            CardService.UpdateCard(card);

            return Ok(card);
        }


        /// <summary>
        /// Adds ammount to Card property, does not replace value (arithmetic summatory)
        /// </summary>
        /// <param name="id">GUID for Card</param>
        /// <param name="ammount">Ammount to sum up</param>
        /// <returns></returns>
        [HttpPatch("update/ammount/{id}")]
        public IActionResult AddAmmountToCard(Guid id, [FromBody] AmmountDTO model)
        {
            if (id == Guid.Empty)
            {
                return BadRequest("Invalid arguments. Check request parameters.");
            }

            var card = CardService.GetCardByGuid(id);

            if (card == null)
            {
                return NotFound($"Card with ID {id} not found");
            }

            // ADDS new value (doesn't replace)
            card.Amount += model.Ammount;

            CardService.UpdateCard(card);

            return Ok(card);
        }

        /// <summary>
        /// Returns CSV file for all Cards
        /// </summary>
        /// <returns></returns>
        [HttpGet("action/download")]
        public FileResult Download()
        {
            return File(Encoding.ASCII.GetBytes(CardService.CsvEncriptedFile()), "text/csv", "encriptedfile.csv");
        }
    }

    public class PinDTO
    {
        public string Pin { get; set; }
    };

    public class AmmountDTO
    {
        public decimal Ammount { get; set; }
    };
}
