using FitnessWebsite.Dtos;
using System.Security.Claims;

namespace FitnessWebsite.Interfaces
{
    public interface IExerciseService
    {
        Task<ExerciseViewDto> AddAsync(int workoutId,  ExercisePostDto exerciseDto, string userId);
        Task DeleteAsync(int workoutId, int exerciseId, ClaimsPrincipal user);
        Task<List<ExerciseViewDto>> GetAllAsync(int workoutId);
        Task<ExerciseViewDto> GetByIdAsync(int workoutId, int exerciseId);
        Task UpdateAsync(int workoutId, int exerciseId, ClaimsPrincipal user, ExercisePostDto exerciseDto);

    }
}
