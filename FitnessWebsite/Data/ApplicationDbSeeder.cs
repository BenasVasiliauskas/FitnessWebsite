using FitnessWebsite.Constants;
using FitnessWebsite.Entities;
using Microsoft.AspNetCore.Identity;


namespace FitnessWebsite.Data
{
    public class ApplicationDbSeeder
    {
        private readonly UserManager<ApplicationUser> _userManager;
        private readonly RoleManager<IdentityRole> _roleManager;

        public ApplicationDbSeeder(UserManager<ApplicationUser> userManager, RoleManager<IdentityRole> roleManager)
        {
            _userManager = userManager;
            _roleManager = roleManager;
        }

        public async Task SeedAsync()
        {
            var roles = new List<string>() { "Admin", "Moderator", Authorization.Roles.User.ToString() };

            foreach (var item in roles)
            {
                var exists = await _roleManager.RoleExistsAsync(item);
                if (!exists)
                {
                    await _roleManager.CreateAsync(new IdentityRole(item));
                }
            }
        }
    }
}
