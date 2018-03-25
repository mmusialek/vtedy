using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Vetheria.Vtedy.Application.Core;
using Vetheria.VtedyService.Database;
using Vetheria.VtedyService.Models;

namespace Vetheria.Vtedy.Application.Handlers
{
    public class GetTagsQueryHandler : HandlerBase, IQueryHandler<Task<IEnumerable<Tag>>>
    {
        public GetTagsQueryHandler(IDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<Tag>> Execute()
        {
            return await _context.Tags.AsNoTracking().AsNoTracking().ToListAsync();

        }
    }
}
