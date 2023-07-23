namespace FitnessWebsite.Entities
{
    public class Exercise
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int AmountOfSets { get; set; }

        public int AmountOfReps { get; set; }

        public string Description { get; set; }
        public string VideoUrl { get; set; }
        public string ImageUrl { get; set; }
        public string Category { get; set; }
        public Workout Workout { get; set; }

        public List<Comment> Comments { get; set; }
    }
}
