using FitnessWebsite.Data;
using FitnessWebsite.Entities;
using FitnessWebsite.Exceptions;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace FitnessWebsite.Repositories
{
    public class ExerciseRepository : BaseRepository<Exercise>
    {
        public ExerciseRepository(ApplicationDbContext context) : base(context)
        {

        }

        public override async Task<Exercise> GetByIdAsync(int id)
        {
            return await _context.Exercises.Include(w => w.Comments)
                .SingleOrDefaultAsync(w => w.Id == id)
                ?? throw new EntityMissingInDatabaseException("Exercise with this id doesnt exist");

        }
    }
}