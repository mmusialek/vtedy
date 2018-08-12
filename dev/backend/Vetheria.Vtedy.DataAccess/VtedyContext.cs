using Microsoft.EntityFrameworkCore;
using Vetheria.Vtedy.DataModel.Model;

namespace Vetheria.Vtedy.DataAccess
{
    public class VtedyContext : DbContext, IDbContext
    {
        public VtedyContext(DbContextOptions<VtedyContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.TodoItemBuilder();
            modelBuilder.TagsBuilder();
            modelBuilder.ProjectsBuilder();
        }

        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<Project> Projects { get; set; }
    }
}

