using FitnessWebsite.Dtos;
using FitnessWebsite.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace FitnessWebsite.Controllers
{
    [ApiController]
    [Route("api/")]
    public class ExerciseController : ControllerBase
    {
        private readonly IExerciseService _exerciseService;

        public ExerciseController(IExerciseService exerciseService)
        {
            _exerciseService = exerciseService;
        }

        [HttpGet("workouts/{workoutId}/exercises")]
        public async Task<IActionResult> GetAllExercises(int exerciseId)
        {
            var exercises = await _exerciseService.GetAllAsync(exerciseId);
            return Ok(exercises);
        }
        [HttpGet("workouts/{workoutId}/exercises/{exerciseId}")]
        public async Task<IActionResult> GetExerciseById(int workoutId, int exerciseId)
        {
            var exercise = await _exerciseService.GetByIdAsync(workoutId, exerciseId);
            return Ok(exercise);
        }

        [Authorize(Roles = "User")]
        [HttpPost("workouts/{workoutId}/exercises/{exerciseId}")]
        public async Task<IActionResult> AddExercise(int workoutId, ExercisePostDto request)
        {
            var exercise = await _exerciseService.AddAsync(workoutId, User.FindFirst("userId").Value, request);
            return CreatedAtAction(nameof(GetExerciseById), new { workoutId, exerciseId = exercise.Id}, exercise);

        }

        [Authorize(Roles = "User")]
        [HttpPut("workouts/{workoutId}/exercises/{exerciseId}")]
        public async Task<IActionResult> UpdateExercise(int workoutId, int exerciseId, ExercisePostDto request)
        {
            await _exerciseService.UpdateAsync(workoutId, exerciseId, User.FindFirst("userId").Value, request);
            return NoContent();
        }

        [Authorize(Roles = "User")]
        [HttpPut("workouts/{workoutId}/exercises/{exerciseId}")]
        public async Task<IActionResult> DeleteExercise(int workoutId, int exerciseId)
        {
            _exerciseService.DeleteAsync(workoutId, exerciseId, User.FindFirst("userId").Value);
            return NoContent();
        }
    }
}
