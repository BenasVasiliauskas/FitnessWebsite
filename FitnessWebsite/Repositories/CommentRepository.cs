using FitnessWebsite.Data;
using FitnessWebsite.Entities;
using FitnessWebsite.Exceptions;
using Microsoft.EntityFrameworkCore;

namespace FitnessWebsite.Repositories
{
    public class CommentRepository : BaseRepository<Comment>
    {
        public CommentRepository(ApplicationDbContext context) : base(context)
        {

        }

        public override async Task<Comment> GetByIdAsync(int id)
        {
            var workout = await _context.Workouts
            .Include(w => w.Exercises)
            .ThenInclude(e => e.Comments)
            .SingleOrDefaultAsync(w => w.Id == id);

            // Check if the workout is found, if not return null or some other appropriate result
            if (workout == null)
            {
                throw new EntityMissingInDatabaseException("Workout with this id doesn't exist!"); ; // Or you could return a specific NotFound response
            }

            // Get the exercise with the specified ID and include its comments
            var exercise = await _context.Exercises
                .Include(e => e.Comments)
                .SingleOrDefaultAsync(e => e.Workout.Id == id);

            if (exercise == null)
            {
                throw new EntityMissingInDatabaseException("No exercises exist for the workout with the specified ID.");
            }

            var comment = exercise.Comments.SingleOrDefault(c => c.Id == id);

            if (comment == null)
            {
                throw new EntityMissingInDatabaseException("No comment exists with the specified ID.");
            }
            return comment;
        }
    }
}
