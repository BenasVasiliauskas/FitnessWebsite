using FitnessWebsite.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;

namespace FitnessWebsite.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {
        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            builder.Entity<Workout>()
                 .HasOne(t => t.ApplicationUser)
                 .WithMany(u => u.Workouts)
                 .OnDelete(DeleteBehavior.Restrict);


        }

        public DbSet<Workout> Workouts { get; set; }
        //public DbSet<Post> Posts { get; set; }
        //public DbSet<Comment> Comments { get; set; }
    }
}
