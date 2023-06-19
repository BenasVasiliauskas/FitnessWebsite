using Microsoft.AspNetCore.Identity;

namespace FitnessWebsite.Entities
{
    public class ApplicationUser : IdentityUser
    {
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public string? RefreshToken { get; set; }
        public DateTime RefreshTokenExpiryTime { get; set; }
        public List<Workout> Workouts { get; set; }
    }
}
