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
        public string ImageUrl { get; set; }

        public string VideoUrl { get; set; }
        [Required]
        public string Category { get; set; }
    }
}
