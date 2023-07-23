using FitnessWebsite.Entities;
using System.ComponentModel.DataAnnotations;

namespace FitnessWebsite.Dtos
{
    public class ExerciseViewDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int AmountOfReps { get; set; }
        public int AmountOfSets { get; set; }
        public string Description { get; set; }
        public string ImageUrl { get; set; }
        public string VideoUrl { get; set; }
        public string Category { get; set; }
        public List<CommentViewDto> Comments { get; set; }

    }
}
