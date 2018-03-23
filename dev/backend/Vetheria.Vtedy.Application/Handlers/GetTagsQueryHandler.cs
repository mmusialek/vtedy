using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Threading.Tasks;
using Vetheria.VtedyService.Database;
using Vetheria.VtedyService.Models;

namespace Vetheria.Vtedy.Application.Handlers
{
    public class GetTagsQueryHandler
    {
        private VtedyContext _context;

        public GetTagsQueryHandler(VtedyContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<Tag>> Execute()
        {            
            return await _context.Tags.AsNoTracking().AsNoTracking().ToListAsync();
            
        }
    }
}
