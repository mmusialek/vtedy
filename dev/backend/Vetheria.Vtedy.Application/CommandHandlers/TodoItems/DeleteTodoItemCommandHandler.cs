using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Vetheria.Vtedy.Application.Core;
using Vetheria.Vtedy.DataAccess;

namespace Vetheria.Vtedy.Application.CommandHandlers.TodoItems
{
    public class DeleteTodoItemCommandHandler : HandlerBase, ICommandHandler<string, Task<Result<string>>>
    {
        public DeleteTodoItemCommandHandler(IDbContext context) : base(context)
        {
        }

        public async Task<Result<string>> ExecuteAsync(string input)
        {
            var gInput = Guid.Parse(input);
            var item = await _context.TodoItems.FirstOrDefaultAsync(p => p.Id == gInput);
            if(item != null)
            {
                _context.TodoItems.Remove(item);
                await _context.SaveChangesAsync();
                return await Task.FromResult(Result<string>.CreateSuccess(item.Id.ToString()));
            }

            return await Task.FromResult(Result<string>.CreateFailure());
        }
    }
}
