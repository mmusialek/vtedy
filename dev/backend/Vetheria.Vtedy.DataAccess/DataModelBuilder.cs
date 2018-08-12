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

            obj.HasMany(p => p.Tags);

        }

        internal static void TagsBuilder(this ModelBuilder modelBuilder)
        {
            var obj = modelBuilder.Entity<Tag>();
            obj.HasKey(p => p.Id);
            obj.Property(p => p.Name).HasMaxLength(100).IsRequired();

            obj.HasMany(p => p.TodoItems);
        }

        internal static void ProjectsBuilder(this ModelBuilder modelBuilder)
        {
            var obj = modelBuilder.Entity<Project>();
            obj.HasKey(p => p.Id);
            obj.Property(p => p.Name).HasMaxLength(100).IsRequired();
            obj.Property(p => p.Description);

//            obj.HasMany(p => p.Users);
        }
    }
}
