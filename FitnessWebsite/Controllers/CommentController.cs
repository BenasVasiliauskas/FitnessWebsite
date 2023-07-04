using FitnessWebsite.Dtos;
using FitnessWebsite.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitnessWebsite.Controllers
{
    [ApiController]
    [Route("api/")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentService _commentService;

        public CommentController(ICommentService commentService)
        {
            _commentService = commentService;
        }

        [HttpGet("workouts/{workoutId}/exercises/{exerciseId}/comments")]
        public async Task<IActionResult> GetAllComments(int workoutId, int exerciseId)
        {
            var comments = await _commentService.GetAllAsync(workoutId, exerciseId);
            return Ok(comments);

        }

        [HttpGet("workouts/{workoutId}/exercises/{exerciseId}/comments/{commentId}")]
        public async Task<IActionResult> GetCommentById(int workoutId, int exerciseId, int commentId)
        {
            var comment = await _commentService.GetByIdAsync(workoutId, exerciseId, commentId);
            return Ok(comment);
        }

        [Authorize(Roles = "User")]
        [HttpPost("workouts/{workoutId}/exercises/{exerciseId}/comments")]
        public async Task<IActionResult> AddComment(int workoutId, int exerciseId, CommentPostDto request)
        {
            var comment = await _commentService.AddAsync(workoutId, exerciseId, request);
            return CreatedAtAction(nameof(GetCommentById), new { workoutId, exerciseId, commentId = comment.Id }, comment);
        }

        [Authorize(Roles = "User")]
        [HttpPut("workouts/{workoutId}/exercises/{exerciseId}/comments/{commentId}")]
        public async Task<IActionResult> UpdateComments (int workoutId, int exerciseId, int commentId, CommentPostDto request)
        {
            await _commentService.UpdateAsync(workoutId, exerciseId, commentId, User, request);
            return NoContent();
        }

        [Authorize(Roles = "User")]
        [HttpDelete("workouts/{workoutId}/exercises/{exerciseId}/comments/{commentId}")]
        public async Task<IActionResult> DeleteComment(int workoutId, int exerciseId, int commentId)
        {
            await _commentService.DeleteAsync(workoutId, exerciseId, commentId, User);
            return NoContent();
        }
    }
}
