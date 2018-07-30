using System.ComponentModel.DataAnnotations;

namespace RaffleWeb.Models
{
    public class Person
    {
        [Key]
        [Required]
        [StringLength(maximumLength: 50, MinimumLength = 3)]
        public string Name { get; set; }
    }
}