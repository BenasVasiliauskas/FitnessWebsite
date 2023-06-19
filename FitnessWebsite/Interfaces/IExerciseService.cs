using FitnessWebsite.Dtos;

namespace FitnessWebsite.Interfaces
{
    public interface IExerciseService
    {
        Task<ExerciseViewDto> AddAsync(string userId, ExercisePostDto exerciseDto);
        Task DeleteAsync(int id, string userId);
        Task<List<ExerciseViewDto>> GetAllAsync();
        Task<ExerciseViewDto> GetByIdAsync(int id);
        Task UpdateAsync(int tripId, string userId, ExercisePostDto exerciseDto);

    }
}
