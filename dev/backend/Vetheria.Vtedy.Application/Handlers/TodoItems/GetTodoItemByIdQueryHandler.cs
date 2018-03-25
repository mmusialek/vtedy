using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Vetheria.Vtedy.Application.Core;
using Vetheria.VtedyService.Database;
using Vetheria.VtedyService.Models;

namespace Vetheria.Vtedy.Application.Handlers.TodoItems
{
    public class GetTodoItemByIdQueryHandler : HandlerBase, IQueryHandler<int, Task<Result<TodoItem>>>
    {
        public GetTodoItemByIdQueryHandler(IDbContext context) : base(context)
        {
        }

        public async Task<Result<TodoItem>> ExecuteAsync(int id)
        {
            var item = await _context.TodoItems.FirstOrDefaultAsync(p => p.Id == id);
            if (item != null)
            {
                return Result<TodoItem>.CreateSuccess(item);
            }

            return await Task.FromResult(Result<TodoItem>.CreateFailure());
        }
    }
}
