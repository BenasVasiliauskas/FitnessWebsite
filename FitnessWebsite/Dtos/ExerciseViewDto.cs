using FitnessWebsite.Entities;

namespace FitnessWebsite.Dtos
{
    public class ExerciseViewDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public List<CommentViewDto> Comments { get; set; }

    }
}
