using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vetheria.Vtedy.Application.Core;
using Vetheria.Vtedy.DataAccess;
using Vetheria.Vtedy.DataModel.Model;

namespace Vetheria.Vtedy.Application.Handlers.TodoItems
{
    public class GetTodoItemsQueryHandler : HandlerBase, IQueryHandler<Task<IEnumerable<TodoItem>>>
    {
        public GetTodoItemsQueryHandler(IDbContext context) : base(context)
        {
        }

        public async Task<IEnumerable<TodoItem>> Execute()
        {
            var res = _context.TodoItems.Include(p=> p.Project).Include(p => p.TodoItemTags).ThenInclude(p => p.Tag).ToList();
            return await Task.FromResult<IEnumerable<TodoItem>>(res);
        }
    }
}
