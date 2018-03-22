using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vetheria.VtedyService.Models;

namespace Vetheria.VtedyService.Database
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
    }
}
