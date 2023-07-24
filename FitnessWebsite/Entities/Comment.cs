using Microsoft.Extensions.Hosting;

namespace FitnessWebsite.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public string Body { get; set; }
        public string CreatedDate { get; set; }
        public string UpdatedDate { get; set; }
        public Exercise Exercise { get; set; }
        public int ExerciseId { get; set; }
    }
}
