using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FitnessWebsite.Interfaces;
using FitnessWebsite.Dtos;
using Microsoft.Extensions.Logging;
using Azure.Core;

namespace FitnessWebsite.Controllers
{
    

    [ApiController]
    [Route("api/")]


    public class WorkoutController : ControllerBase
    {
        private readonly IWorkoutService _workoutService;
        private readonly IAuthorizationService _authorizationService;

        private readonly ILogger<WorkoutController> _logger;


        public WorkoutController(IWorkoutService workoutService, IAuthorizationService authorizationService, ILogger<WorkoutController> logger)
        {
            _workoutService = workoutService;
            _authorizationService = authorizationService;
            _logger = logger;
        }

        [HttpGet("workouts")]
        public async Task<IActionResult> GetAllWorkouts()
        {
            var workouts = await _workoutService.GetAllAsync();
            return Ok(workouts);
        }

        [HttpGet("workouts/{workoutId}")]
        public async Task<IActionResult> GetWorkoutById(int workoutId)
        {
            var workouts = await _workoutService.GetByIdAsync(workoutId);
            return Ok(workouts);
        }
        [Authorize(Roles = "User,Admin")]
        [HttpPost("workouts")]
        public async Task<IActionResult> AddWorkout(WorkoutPostDto request)
        {
            try
            {
                var workout = await _workoutService.AddAsync(User.FindFirst("userId").Value, request);
                return CreatedAtAction(nameof(GetWorkoutById), new { workoutId = workout.Id }, workout);
            }
            catch (Exception ex)
            {
                // Log the exception (optional but recommended for better debugging)
                _logger.LogError(ex, "An error occurred while adding the workout.");

                // Return a more detailed error response with the exception message and stack trace
                return BadRequest($"An error occurred while adding the workout: {ex.Message}\n\n{ex.StackTrace}");
            }
        }

        [Authorize(Roles = "User,Admin")]
        [HttpPut("workouts")]
        public async Task<IActionResult> UpdateWorkout(WorkoutPostDto request, int id)
        {
            await _workoutService.UpdateAsync(id, User.FindFirst("userId").Value, request, User);
            return NoContent();
        }

        [Authorize(Roles = "Admin")]
        [HttpDelete("workouts")]
        public async Task<IActionResult> DeleteWorkout(int id)
        {
            await _workoutService.DeleteAsync(id, User.FindFirst("userId").Value, User);
            return NoContent();
        }
    }
}
