using System.Security.Claims;
using FitnessWebsite.Dtos;

namespace FitnessWebsite.Interfaces
{
    public interface ICommentService
    {
        Task<CommentViewDto> AddAsync(int workoutId, int exerciseId, CommentPostDto commentDto);
        Task DeleteAsync(int workoutId, int exerciseId, int commentId, ClaimsPrincipal user);
        Task<List<CommentViewDto>> GetAllAsync(int workoutId, int exerciseId);
        Task<CommentViewDto> GetByIdAsync(int workoutId, int exerciseId, int commentId);
        Task UpdateAsync(int workoutId, int exerciseId, int commentId, ClaimsPrincipal user, CommentPostDto commentDto);
    }
}