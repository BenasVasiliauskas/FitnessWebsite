namespace FitnessWebsite.Entities
{
    public class Exercise
    {
        public int Id { get; set; }

        public string Name { get; set; }

        public int AmountOfSets { get; set; }

        public int AmountOfReps { get; set; }

        public string Description { get; set; }

        public List<Comment> Comments { get; set; }
    }
}
