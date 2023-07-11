using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.AspNetCore.Identity;
using FitnessWebsite.Entities;
using FitnessWebsite.Repositories;
using FitnessWebsite.Data;
using FitnessWebsite.Interfaces;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using FitnessWebsite.Services;
using Microsoft.Extensions.Hosting;

namespace AdAstra.DataAccess.Extensions
{
    public static class ServiceExtensions
    {
        public static void ConfigureIdentity(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddIdentity<ApplicationUser, IdentityRole>(options =>
            {
                options.Password.RequireUppercase = false;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 3;
            })
            .AddEntityFrameworkStores<ApplicationDbContext>();

            services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultForbidScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = false,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    ValidIssuer = configuration["JWT:Issuer"],
                    ValidAudience = configuration["JWT:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(configuration["JWT:Key"]))
                };
            });
        }
        public static void ConfigureDependencyInjection(this IServiceCollection services)
        {
            services.AddTransient<IAuthService, AuthService>();

            services.AddTransient<IWorkoutService, WorkoutService>();
            services.AddTransient<IExerciseService, ExerciseService>();
            services.AddTransient<ICommentService, CommentService>();
            services.AddTransient<ITokenService, TokenService>();
            services.AddScoped<ApplicationDbSeeder>();
        }

        public static void ConfigureDataAccess(this IServiceCollection services, IConfiguration configuration)
        {
            services.AddDbContext<ApplicationDbContext>(options =>
                options.UseSqlServer("Data Source=(localdb)\\MSSQLLocalDB; Initial Catalog=FitnessWebsiteDatabase"));

            services.AddTransient<IBaseRepository<Workout>, WorkoutRepository>();
            services.AddTransient<IBaseRepository<Exercise>, ExerciseRepository>();
            services.AddTransient<IBaseRepository<Comment>, CommentRepository>();
        }
    }
}

