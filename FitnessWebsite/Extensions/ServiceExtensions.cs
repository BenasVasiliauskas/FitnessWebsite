using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using FitnessWebsite.Entities;
using FitnessWebsite.Repositories;
using FitnessWebsite.Data;
using FitnessWebsite.Interfaces;

namespace AdAstra.DataAccess.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureDataAccess(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options => 
                options.UseMySql(configuration.GetConnectionString("Default"), ServerVersion.AutoDetect(configuration.GetConnectionString("Default"))));

            services.AddTransient<IBaseRepository<Workout>, WorkoutRepository>();

        }
    }
}
