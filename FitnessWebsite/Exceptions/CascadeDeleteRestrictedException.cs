namespace FitnessWebsite.Exceptions
{
    public class CascadeDeleteRestrictedException : Exception
    {
        public CascadeDeleteRestrictedException(string message) : base(message)
        {

        }
    }
}