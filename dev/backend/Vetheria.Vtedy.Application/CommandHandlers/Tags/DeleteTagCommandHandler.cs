using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vetheria.Vtedy.Application.Core;
using Vetheria.Vtedy.DataAccess;

namespace Vetheria.Vtedy.Application.CommandHandlers.Tags
{
    public class DeleteTagCommandHandler : HandlerBase, ICommandHandler<int, Task<Result<int>>>
    {
        public DeleteTagCommandHandler(IDbContext context) : base(context)
        {
        }

        public async Task<Result<int>> ExecuteAsync(int input)
        {
            var tagExists = await _context.Tags.FirstOrDefaultAsync(p => p.Id == input);
            if (tagExists != null)
            {
                _context.Tags.Remove(tagExists);
                await _context.SaveChangesAsync();
                return await Task.FromResult(Result<int>.CreateSuccess(tagExists.Id));
            }

            return await Task.FromResult(Result<int>.CreateFailure());
        }
    }
}
