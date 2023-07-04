using FitnessWebsite.Dtos;
using FitnessWebsite.Entities;
using AutoMapper;
using Microsoft.Extensions.Hosting;

namespace FitnessWebsite.Profiles
{
    public class MappingProfiles : Profile
    {
        public MappingProfiles()
        {
            CreateMap<Workout, WorkoutViewDto>();
            CreateMap<WorkoutPostDto, Workout>();
            CreateMap<Exercise, ExerciseViewDto>();
            CreateMap<ExercisePostDto, Exercise>();
            CreateMap<Comment, CommentViewDto>();
            CreateMap<CommentPostDto, Comment>();
            CreateMap<RegisterUserDto, ApplicationUser>();
        }
    }
}