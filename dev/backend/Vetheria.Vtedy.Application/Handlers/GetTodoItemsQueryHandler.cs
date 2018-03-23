using System;
using System.Collections.Generic;
using System.Text;
using System.Threading.Tasks;
using Vetheria.VtedyService.Database;
using Vetheria.VtedyService.Models;

namespace Vetheria.Vtedy.Application.Handlers
{
    public class GetTodoItemsQueryHandler
    {
        private VtedyContext _context;

        public GetTodoItemsQueryHandler(VtedyContext context)
        {
            _context = context;
        }

        public async Task<IEnumerable<TodoItem>> Execute()
        {
            return await Task.FromResult<IEnumerable<TodoItem>>(null);
        }
    }
}
