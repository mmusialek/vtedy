using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vetheria.Vtedy.Application.Core;
using Vetheria.Vtedy.DataAccess;
using Vetheria.Vtedy.DataModel.Model;

namespace Vetheria.Vtedy.Application.Handlers.Tags
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
