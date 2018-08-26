using Microsoft.EntityFrameworkCore;
using Vetheria.Vtedy.DataModel.Model;

namespace Vetheria.Vtedy.DataAccess
{
    public class VtedyContext : DbContext, IDbContext
    {
        public VtedyContext(DbContextOptions<VtedyContext> options)
            : base(options)
        {
//            MockData.Run(this);
        }
//        public VtedyContext()
//        {
//        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.TodoItemBuilder();
            modelBuilder.TagsBuilder();
            modelBuilder.ProjectsBuilder();
            modelBuilder.TodoItemTagBuilder();
        }

//        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
//        {
//            base.OnConfiguring(optionsBuilder);
//
//            optionsBuilder.UseSqlServer(@"Server=(localdb)\\v13.0;Database=VtedyDatabase;Trusted_Connection=True;MultipleActiveResultSets=true");
//        }

        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<Tag> Tags { get; set; }
        public DbSet<TodoItemTag> TodoItemTags { get; set; }
        public DbSet<Project> Projects { get; set; }
        public DbSet<VtedyIdentityUser> VtedyUsers { get; set; }
    }
}
