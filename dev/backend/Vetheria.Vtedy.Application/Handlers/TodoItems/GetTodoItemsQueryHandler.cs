using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Vetheria.Vtedy.Application.Core;
using Vetheria.VtedyService.Database;
using Vetheria.VtedyService.Models;

namespace Vetheria.Vtedy.Application.Handlers
{
    public class GetTodoItemsQueryHandler : HandlerBase, IQueryHandler<Task<IEnumerable<TodoItem>>>
    {
        public GetTodoItemsQueryHandler(IDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<TodoItem>> Execute()
        {
            return await Task.FromResult<IEnumerable<TodoItem>>(null);
        }
    }
}
