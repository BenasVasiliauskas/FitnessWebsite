
namespace FitnessWebsite.Interfaces
{
    public interface IBaseRepository<T>
    {
        public IQueryable<T> GetAll();
        public Task<T> GetByIdAsync(int id);
        public Task AddAsync(T obj);
        public Task UpdateAsync(T obj);
        public Task DeleteAsync(T obj);
    }
}
