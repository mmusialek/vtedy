using Microsoft.EntityFrameworkCore;
using Vetheria.Vtedy.DataModel.Model;

namespace Vetheria.Vtedy.DataAccess
{
    internal static class DataModelBuilder
    {
        internal static void TodoItemBuilder(this ModelBuilder modelBuilder)
        {
            var obj = modelBuilder.Entity<TodoItem>();
            obj.HasKey(p => p.Id);
            obj.Property(p => p.Name).HasMaxLength(100).IsRequired();
            obj.Property(p => p.IsComplete).IsRequired();


            // obj.HasMany(p => p.Tags)
            obj.HasOne(p => p.Project).WithMany(p => p.TodoItems);
        }

        internal static void TodoItemTagBuilder(this ModelBuilder modelBuilder)
        {

            // many to many with Tag
            modelBuilder.Entity<TodoItemTag>()
                .HasKey(p => new
                {
                    p.TodoItemId,
                    p.TagId
                });


            modelBuilder.Entity<TodoItemTag>()
                .HasOne(p => p.TodoItem)
                .WithMany(p => p.TodoItemTags)
                .HasForeignKey(p => p.TodoItemId);

            modelBuilder.Entity<TodoItemTag>()
                .HasOne(p => p.Tag)
                .WithMany(p => p.TodoItemTags)
                .HasForeignKey(p => p.TagId);
        }

        internal static void TagsBuilder(this ModelBuilder modelBuilder)
        {
            var obj = modelBuilder.Entity<Tag>();
            obj.HasKey(p => p.Id);
            obj.Property(p => p.Name).HasMaxLength(100).IsRequired();
        }

        internal static void ProjectsBuilder(this ModelBuilder modelBuilder)
        {
            var obj = modelBuilder.Entity<Project>();
            obj.HasKey(p => p.Id);
            obj.Property(p => p.Name).HasMaxLength(100).IsRequired();
            obj.Property(p => p.Description);

            obj.HasMany(p => p.TodoItems).WithOne(p => p.Project);
            obj.HasMany(p => p.Users).WithOne(p => p.Project);
        }
    }
}
