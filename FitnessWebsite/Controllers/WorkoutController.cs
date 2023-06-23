using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using FitnessWebsite.Interfaces;
using FitnessWebsite.Dtos;
using Azure.Core;

namespace FitnessWebsite.Controllers
{
    [ApiController]
    [Route("api/")]

    public class WorkoutController : ControllerBase
    {
        private readonly IWorkoutService _workoutService;
        private readonly IAuthorizationService _authorizationService;

        public WorkoutController(IWorkoutService workoutService, IAuthorizationService authorizationService)
        {
            _workoutService = workoutService;
            _authorizationService = authorizationService;
        }

        [HttpGet("workouts")]
        public async Task<IActionResult> GetAllWorkouts()
        {
            var workouts = await _workoutService.GetAllAsync();
            return Ok(workouts);
        }

        [HttpGet("workouts/{workoutId}")]
        public async Task<IActionResult> GetWorkoutById(int id)
        {
            var workouts = await _workoutService.GetByIdAsync(id);
            return Ok(workouts);
        }
        [Authorize(Roles = "User")]
        [HttpPost("workouts")]
        public async Task<IActionResult> AddWorkout(WorkoutPostDto request)
        {
            var workout = await _workoutService.AddAsync(User.FindFirst("userId").Value, request);
            return CreatedAtAction(nameof(GetWorkoutById), new { workoutId = workout.Id }, workout);
        }

        [Authorize(Roles = "User")]
        [HttpPut("workouts")]
        public async Task<IActionResult> UpdateWorkout(WorkoutPostDto request, int id)
        {
            await _workoutService.UpdateAsync(id, User.FindFirst("userId").Value, request);
            return Ok();
        }

        [Authorize(Roles = "User")]
        [HttpDelete("workouts")]
        public async Task<IActionResult> DeleteWorkout(int id)
        {
            await _workoutService.DeleteAsync(id, User.FindFirst("userId").Value);
            return NoContent();
        }
    }
}
