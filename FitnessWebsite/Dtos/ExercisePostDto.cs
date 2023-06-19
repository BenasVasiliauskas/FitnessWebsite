using System.ComponentModel.DataAnnotations;

namespace FitnessWebsite.Dtos
{
    public class ExercisePostDto
    {
        [Required]
        public string Name { get; set; }
        [Required]
        public string Description { get; set; }
        [Required]
        public int AmountOfReps { get; set; }
        [Required]
        public int AmountOfSets { get; set; }
    }
}
