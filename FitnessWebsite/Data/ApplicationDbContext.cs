using FitnessWebsite.Entities;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Hosting;

namespace FitnessWebsite.Data
{
    public class ApplicationDbContext : IdentityDbContext<ApplicationUser>
    {



        public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options)
        {

        }

        protected override void OnModelCreating(ModelBuilder builder)
        {
            base.OnModelCreating(builder);
            builder.Entity<Exercise>()
                .HasOne(e => e.Workout)
                .WithMany(w => w.Exercises)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Workout>()
                .HasOne(w => w.ApplicationUser)
                .WithMany(u => u.Workouts)
                .OnDelete(DeleteBehavior.Restrict);

            builder.Entity<Comment>()
                .HasOne(c => c.Exercise)
                .WithMany(e => e.Comments)
                .OnDelete(DeleteBehavior.Restrict);


        }

        public DbSet<Workout> Workouts { get; set; }
        public DbSet<Exercise> Exercises { get; set; }
        public DbSet<Comment> Comments { get; set; }
    }
}
