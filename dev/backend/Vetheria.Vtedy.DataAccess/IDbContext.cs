using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using Vetheria.VtedyService.Models;

namespace Vetheria.VtedyService.Database
{
    public interface IDbContext
    {
        DbSet<TodoItem> TodoItems { get;  }
        DbSet<Tag> Tags { get; }
        int SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
    }
}
