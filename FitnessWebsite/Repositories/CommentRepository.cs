using FitnessWebsite.Data;
using FitnessWebsite.Entities;

namespace FitnessWebsite.Repositories
{
    public class CommentRepository : BaseRepository<Comment>
    {
        public CommentRepository(ApplicationDbContext context) : base(context)
        {

        }
    }
}
