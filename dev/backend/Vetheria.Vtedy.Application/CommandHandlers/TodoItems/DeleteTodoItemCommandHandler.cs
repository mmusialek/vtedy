using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Vetheria.Vtedy.Application.Core;
using Vetheria.VtedyService.Database;

namespace Vetheria.Vtedy.Application.CommandHandlers.TodoItems
{
    public class DeleteTodoItemCommandHandler : HandlerBase, ICommandHandler<int, Task<Result<long>>>
    {
        public DeleteTodoItemCommandHandler(IDbContext context) : base(context)
        {
        }

        public async Task<Result<long>> ExecuteAsync(int input)
        {
            var item = await _context.TodoItems.FirstOrDefaultAsync(p => p.Id == input);
            if(item != null)
            {
                _context.TodoItems.Remove(item);
                await _context.SaveChangesAsync();
                return await Task.FromResult(Result<long>.CreateSuccess(item.Id));
            }

            return await Task.FromResult(Result<long>.CreateFailure());
        }
    }
}
