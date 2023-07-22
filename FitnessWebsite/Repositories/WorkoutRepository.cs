using FitnessWebsite.Data;
using FitnessWebsite.Entities;
using FitnessWebsite.Exceptions;
using FitnessWebsite.Repositories;
using Microsoft.EntityFrameworkCore;

namespace FitnessWebsite.Repositories
{
    public class WorkoutRepository : BaseRepository<Workout>
    {
        public WorkoutRepository(ApplicationDbContext context) :base(context)
        { 
            
        }

        public override async Task<Workout> GetByIdAsync(int id)
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

            return workout;
        }
        public async Task ThrowIfNotFound(int id)
        {
            await GetByIdAsync(id);
        }
    }

}
