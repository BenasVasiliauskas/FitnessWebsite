namespace FitnessWebsite.Entities
{
    public class Workout
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public string Type { get; set; }
        public string ApplicationUserId { get; set; }
        public ApplicationUser ApplicationUser { get; set; }
        public List<Exercise> Exercises { get; set; }
    }
}
