using AutoMapper;
using FitnessWebsite.Dtos;
using FitnessWebsite.Entities;
using FitnessWebsite.Exceptions;
using FitnessWebsite.Interfaces;
using FitnessWebsite.Repositories;

namespace FitnessWebsite.Services
{
    public class ExerciseService : IExerciseService
    {
        private readonly IBaseRepository<Workout> _workoutRepository;
        private readonly IBaseRepository<Exercise> _exerciseRepository;
        private readonly IMapper _mapper;

        public ExerciseService(IBaseRepository<Exercise> exerciseRepository, IBaseRepository<Workout> workoutReposity ,IMapper mapper)
        {
            _workoutRepository = workoutReposity;
            _exerciseRepository = exerciseRepository;
            _mapper = mapper;
        }

        public async Task<ExerciseViewDto> AddAsync(int workoutId, string userId, ExercisePostDto exerciseDto)
        {
          var workout = await _workoutRepository.GetByIdAsync(workoutId);
            if (workout.ApplicationUserId != userId)
            {
                throw new ForbiddenException("You can only add exercises to your own workouts!");
            }
            var exerciseEntity = _mapper.Map<Exercise>(exerciseDto);
            workout.Exercises.Add(exerciseEntity);
            await _exerciseRepository.AddAsync(exerciseEntity);

            return _mapper.Map<ExerciseViewDto>(exerciseEntity);
        }

        public async Task DeleteAsync(int workoutId, int exerciseId, string userId)
        {
            var workout = await _workoutRepository.GetByIdAsync(workoutId);
            if (workout.ApplicationUserId != userId)
            {
                throw new ForbiddenException("You can only delete exercises to your own workouts!");
            }

            var exercise = workout.Exercises.SingleOrDefault(e => e.Id == exerciseId)
                ?? throw new ForbiddenException("Exercise with such an id doesnt exist");

            try
            {
                await _exerciseRepository.DeleteAsync(exercise);

            }
            catch (InvalidOperationException ex)
            {

                throw new CascadeDeleteRestrictedException("Cannot delete exercise because it has comments associated with it!");
            }
        }

        public async Task<List<ExerciseViewDto>> GetAllAsync(int exerciseId)
        {
            var exercise = await _exerciseRepository.GetByIdAsync(exerciseId);

            return _mapper.Map<List<ExerciseViewDto>>(exercise);

        }

        public async Task<ExerciseViewDto> GetByIdAsync(int workoutId, int exerciseId)
        {
            var workout = await _workoutRepository.GetByIdAsync(workoutId);

            var exercise = workout.Exercises.SingleOrDefault(e => e.Id ==exerciseId)
                ?? throw new ForbiddenException("Exercise with such an id doesnt exist");
            
            return _mapper.Map<ExerciseViewDto>(exercise);
        }

        public async Task UpdateAsync(int workoutId, int exerciseId, string userId, ExercisePostDto exerciseDto)
        {
            var workout = await _workoutRepository.GetByIdAsync(workoutId);

            if (workout.ApplicationUserId != userId)
            {
                throw new ForbiddenException("You can only update exercises to your own workouts!");
            }

            var exercise = workout.Exercises.SingleOrDefault(e => e.Id == exerciseId)
                ?? throw new ForbiddenException("Exercise with such an id doesnt exist");
            

            exercise.AmountOfReps = exerciseDto.AmountOfReps;
            exercise.AmountOfSets = exerciseDto.AmountOfSets;
            exercise.Description = exerciseDto.Description;
            exercise.Name = exerciseDto.Name;

            await _exerciseRepository.UpdateAsync(exercise);

        }
    }
}
