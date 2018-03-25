using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Vetheria.Vtedy.Application.Core;
using Vetheria.VtedyService.Database;
using Vetheria.VtedyService.Models;

namespace Vetheria.Vtedy.Application.CommandHandlers.Tags
{
    public class AddTagCommandHandler : HandlerBase, ICommandHandler<Tag, Task<Result<int>>>
    {
        public AddTagCommandHandler(IDbContext context) : base(context)
        {
        }

        public async Task<Result<int>> ExecuteAsync(Tag tag)
        {
            var exists = _context.Tags.AnyAsync(p => p.Name == tag.Name);
            if(exists == null)
            {

                _context.Tags.Add(tag);
                await _context.SaveChangesAsync();

                var res = Result<int>.CreateSuccess(tag.Id);
                return await Task.FromResult(res);
                
            }

            return await Task.FromResult(Result<int>.CreateFailure());
        }
    }
}
