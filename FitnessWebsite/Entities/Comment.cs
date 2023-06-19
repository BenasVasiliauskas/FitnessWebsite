using Microsoft.Extensions.Hosting;

namespace FitnessWebsite.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime UpdatedDate { get; set; }
        public Exercise Exercise { get; set; }
        public int ExerciseId { get; set; }
    }
}
