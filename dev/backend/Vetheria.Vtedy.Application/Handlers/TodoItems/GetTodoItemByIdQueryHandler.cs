using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Vetheria.Vtedy.Application.Core;
using Vetheria.Vtedy.DataAccess;
using Vetheria.Vtedy.DataModel.Model;

namespace Vetheria.Vtedy.Application.Handlers.TodoItems
{
    public class GetTodoItemByIdQueryHandler : HandlerBase, IQueryHandler<string, Task<TodoItem>>
    {
        public GetTodoItemByIdQueryHandler(IDbContext context) : base(context)
        {
        }

        public async Task<TodoItem> ExecuteAsync(string id)
        {
            var item = await _context.TodoItems.FirstOrDefaultAsync(p => p.Id == id);
            if (item != null)
            {
                return item;
            }

            return await Task.FromResult<TodoItem>(null);
        }
    }
}
