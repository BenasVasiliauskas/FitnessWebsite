namespace FitnessWebsite.Exceptions
{
    public class EntityMissingInDatabaseException : Exception
    {
        public EntityMissingInDatabaseException(string message) : base(message)
        {
        }
    }
}
