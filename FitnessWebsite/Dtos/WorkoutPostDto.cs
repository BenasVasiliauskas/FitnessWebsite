using System.ComponentModel.DataAnnotations;

namespace FitnessWebsite.Dtos
{
    public class WorkoutPostDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
    }
}
