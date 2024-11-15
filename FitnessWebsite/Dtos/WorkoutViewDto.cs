﻿namespace FitnessWebsite.Dtos
{
    public class WorkoutViewDto
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Type { get; set; }
        public string Description { get; set; }
        public List<ExerciseViewDto> Exercises { get; set; }

    }
}
