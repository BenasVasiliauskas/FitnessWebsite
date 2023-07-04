using FitnessWebsite.Dtos;

namespace FitnessWebsite.Interfaces
{
    public interface IExerciseService
    {
        Task<ExerciseViewDto> AddAsync(int workoutId, string userId, ExercisePostDto exerciseDto);
        Task DeleteAsync(int workoutId, int exerciseId, string userId);
        Task<List<ExerciseViewDto>> GetAllAsync(int exerciseId);
        Task<ExerciseViewDto> GetByIdAsync(int workoutId, int exerciseId);
        Task UpdateAsync(int workoutId, int exerciseId, string userId, ExercisePostDto exerciseDto);

    }
}
