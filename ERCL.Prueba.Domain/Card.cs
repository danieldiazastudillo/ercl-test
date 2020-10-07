using System.ComponentModel.DataAnnotations;

namespace ERCL.Prueba.Domain
{
    public class Card
    {
        public Card(string name, string pan, string pin)
        {
            Id = System.Guid.NewGuid();
            Name = name;
            Pan = pan;
            Pin = pin;
        }

        public System.Guid Id { get; private set; }
        
        [Required]
        public string Name { get; private set; }

        [Required]
        public string Pan { get; private set; }
        public decimal Amount { get; set; } = 0;

        [Required]
        [RegularExpression(@"^(\d{4})$", ErrorMessage = "Please enter a 4 digit PIN")]
        [StringLength(4, MinimumLength = 4)]
        [DataType(DataType.Password)]
        public string Pin { get; set; }

    }
}
