using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Vetheria.Vtedy.Application.Core;
using Vetheria.Vtedy.DataAccess;
using Vetheria.Vtedy.DataModel.Model;

namespace Vetheria.Vtedy.Application.CommandHandlers.TodoItems
{
    public class AddTodoItemCommandHandler : HandlerBase, ICommandHandler<TodoItem, Task<Result<long>>>
    {
        public AddTodoItemCommandHandler(IDbContext context) : base(context)
        {
        }

        public async Task<Result<long>> ExecuteAsync(TodoItem input)
        {
            var res = _context.TodoItems.Add(input);
            await _context.SaveChangesAsync();
            return await Task.FromResult(Result<long>.CreateSuccess(res.Entity.Id));
        }
    }
}
