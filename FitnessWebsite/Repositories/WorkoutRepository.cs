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
            return await _context.Workouts.Include(t => t.Exercises)
                .ThenInclude(p => p.Comments)
                .SingleOrDefaultAsync(t => t.Id == id)
                ?? throw new EntityMissingInDatabaseException("Workout with this id doesn't exist!");
        }
        public async Task ThrowIfNotFound(int id)
        {
            await GetByIdAsync(id);
        }
    }

}
