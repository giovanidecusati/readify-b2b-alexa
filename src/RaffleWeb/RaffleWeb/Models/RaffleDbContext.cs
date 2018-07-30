using Microsoft.EntityFrameworkCore;

namespace RaffleWeb.Models
{
    public class RaffleDbContext : DbContext
    {
        public RaffleDbContext(DbContextOptions<RaffleDbContext> options) : base(options)
        { }

        public DbSet<Person> People { get; set; }
    }
}