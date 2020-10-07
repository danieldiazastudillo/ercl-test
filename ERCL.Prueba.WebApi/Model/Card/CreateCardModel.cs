using System.ComponentModel.DataAnnotations;

namespace ERCL.Prueba.WebApi.Model.Card
{
    /// <summary>
    /// DTO/ViewModel for Card model in DOMAIN project. 
    /// </summary>
    public class CreateCardModel
    {
        [Required(ErrorMessage = "Name is required")]
        public string Name { get; set; }
        
        [Required]
        public string Pan { get; set; }

        [Required(ErrorMessage = "Password is required")]
        [DataType(DataType.Password)]
        [RegularExpression(@"^(\d{4})$", ErrorMessage = "Please enter a 4 digit PIN")]
        [StringLength(4, MinimumLength = 4)]
        public string Pin { get; set; }

        [DataType(DataType.Password)]        
        [Compare("Pin", ErrorMessage = "The passwords do not match")]
        public string ConfirmPin { get; set; }
    }
}
