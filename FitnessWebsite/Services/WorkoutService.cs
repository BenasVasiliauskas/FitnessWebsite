using AutoMapper;
using FitnessWebsite.Dtos;
using FitnessWebsite.Entities;
using FitnessWebsite.Exceptions;
using FitnessWebsite.Interfaces;
using Microsoft.EntityFrameworkCore;

namespace FitnessWebsite.Services
{
    public class WorkoutService : IWorkoutService
    {
        private readonly IBaseRepository<Workout> _workoutRepository;
        private readonly IMapper _mapper;
        public WorkoutService(IBaseRepository<Workout> workoutRepository, IMapper mapper) 
        {
            _workoutRepository = workoutRepository;
            _mapper = mapper;
        }

        public async Task<WorkoutViewDto> AddAsync(string userId, WorkoutPostDto workoutDto)
        {
            var workoutEntity = _mapper.Map<Workout>(workoutDto);
            workoutEntity.ApplicationUserId = userId;

            await _workoutRepository.AddAsync(workoutEntity);

            return _mapper.Map<WorkoutViewDto>(workoutEntity); 

        }

        public async Task DeleteAsync(int id, string userId)
        {
            var workout = await _workoutRepository.GetByIdAsync(id);

            if (workout.ApplicationUserId != userId)
            {
                throw new ForbiddenException("You can only delete your own workouts!");
            }

            try
            {
                await _workoutRepository.DeleteAsync(workout);
            }
            catch (InvalidOperationException ex)
            {
                throw new CascadeDeleteRestrictedException("Cannot delete workout because there are posts associated with it!");
            }
        }

        public async Task<List<WorkoutViewDto>> GetAllAsync()
        {
            var workouts = await _workoutRepository.GetAll()
                .Include(t => t.Exercises)
                .Include(t => t.ApplicationUser)
                .ToListAsync();

            var mapped = workouts.Select(t =>
            {
                var mapped = _mapper.Map<WorkoutViewDto>(t);
                mapped.UserEmail = t.ApplicationUser.Email;
                return mapped;
            });
            return mapped.ToList();
        }

        public async Task<WorkoutViewDto> GetByIdAsync(int id)
        {
            var workout = await _workoutRepository.GetByIdAsync(id);
            return _mapper.Map<WorkoutViewDto>(workout);
        }

        public async Task UpdateAsync(int workoutId, string userId, WorkoutPostDto workoutDto)
        {
            var workout = await _workoutRepository.GetByIdAsync(workoutId);

            if (workout.ApplicationUserId != userId)
            {
                throw new ForbiddenException("You can only update your own workouts!");
            }

            workout.Name = workoutDto.Name;
            workout.Type = workoutDto.Type;
            workout.Description = workoutDto.Description;

            await _workoutRepository.UpdateAsync(workout);
        }
    }
}
