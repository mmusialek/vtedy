using System.Collections.Generic;
using System.Threading.Tasks;
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
            return await Task.FromResult<IEnumerable<TodoItem>>(null);
        }
    }
}
