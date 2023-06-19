using FitnessWebsite.Data;
using FitnessWebsite.Interfaces;

namespace FitnessWebsite.Repositories
{
    public class BaseRepository<T> : IBaseRepository<T> where T : class
    {
        protected readonly ApplicationDbContext _context;
        public BaseRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task AddAsync(T obj)
        {
            _context.Set<T>().Add(obj);
            await _context.SaveChangesAsync();
        }


        public async Task DeleteAsync(T obj)
        {
            _context.Set<T>().Remove(obj);
            await _context.SaveChangesAsync();
        }
        public IQueryable<T> GetAll()
        {
            return _context.Set<T>().AsQueryable();
        }
        public virtual async Task<T> GetByIdAsync(int id)
        {
            return await _context.Set<T>().FindAsync(id);
        }

        public async Task UpdateAsync(T obj)
        {
            _context.Set<T>().Update(obj);
            await _context.SaveChangesAsync();
        }

    }
}
