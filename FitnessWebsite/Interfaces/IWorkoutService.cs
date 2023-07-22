using FitnessWebsite.Dtos;
using System.Security.Claims;

namespace FitnessWebsite.Interfaces
{
    public interface IWorkoutService
    {
        Task<WorkoutViewDto> AddAsync(string userId, WorkoutPostDto workoutDto);
        Task DeleteAsync(int id, string userId, ClaimsPrincipal user);
        Task<List<WorkoutViewDto>> GetAllAsync();
        Task<WorkoutViewDto> GetByIdAsync(int id);
        Task UpdateAsync(int workoutId, string userId, WorkoutPostDto workoutDto, ClaimsPrincipal user);
    }
}
