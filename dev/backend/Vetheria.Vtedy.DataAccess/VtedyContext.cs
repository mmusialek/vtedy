using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vetheria.VtedyService.Models;

namespace Vetheria.VtedyService.Database
{
    public class VtedyContext : DbContext
    {
        public VtedyContext(DbContextOptions<VtedyContext> options)
            : base(options)
        {
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.TodoItemBuilder();
            modelBuilder.TagsBuilder();
        }


        public DbSet<TodoItem> TodoItems { get; set; }
        public DbSet<Tag> Tags { get; set; }
    }
}

