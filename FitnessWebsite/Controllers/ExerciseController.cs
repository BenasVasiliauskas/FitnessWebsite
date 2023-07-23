using FitnessWebsite.Dtos;
using FitnessWebsite.Entities;
using FitnessWebsite.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;

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
        public async Task<IActionResult> GetAllExercises(int workoutId)
        {
            var exercises = await _exerciseService.GetAllAsync(workoutId);
            return Ok(exercises);
        }
        [HttpGet("workouts/{workoutId}/exercises/{exerciseId}")]
        public async Task<IActionResult> GetExerciseById(int workoutId, int exerciseId)
        {
            var exercise = await _exerciseService.GetByIdAsync(workoutId, exerciseId);
            return Ok(exercise);
        }

        [Authorize(Roles = "User,Admin")]
        [HttpPost("workouts/{workoutId}/exercises")]
        public async Task<IActionResult> AddExercise(int workoutId, ExercisePostDto request)
        {
            var exercise = await _exerciseService.AddAsync(workoutId, request, User.FindFirst("userId").Value);
           
            return CreatedAtAction(nameof(GetExerciseById), new { workoutId, exerciseId = exercise.Id}, exercise);

        }

        [Authorize(Roles = "User,Admin")]
        [HttpPut("workouts/{workoutId}/exercises/{exerciseId}")]
        public async Task<IActionResult> UpdateExercise(int workoutId, int exerciseId, ExercisePostDto request)
        {
            await _exerciseService.UpdateAsync(workoutId, exerciseId, User, request);
            return NoContent();
        }

        [Authorize(Roles = "User,Admin")]
        [HttpDelete("workouts/{workoutId}/exercises/{exerciseId}")]
        public async Task<IActionResult> DeleteExercise(int workoutId, int exerciseId)
        {
            await _exerciseService.DeleteAsync(workoutId, exerciseId, User);
            return NoContent();
        }
    }
}
