using System.Threading;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vetheria.Vtedy.DataModel.Model;

namespace Vetheria.Vtedy.DataAccess
{
    public interface IDbContext
    {
        DbSet<TodoItem> TodoItems { get; }
        DbSet<Tag> Tags { get; }
        DbSet<TodoItemTag> TodoItemTags { get; }
        DbSet<Project> Projects { get; }
        DbSet<VtedyIdentityUser> VtedyUsers { get; }
        int SaveChanges();
        Task<int> SaveChangesAsync(CancellationToken cancellationToken = default(CancellationToken));
    }
}
