using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Vetheria.Vtedy.Application.Core;
using Vetheria.Vtedy.DataAccess;

namespace Vetheria.Vtedy.Application.CommandHandlers.TodoItems
{
    public class DeleteTodoItemCommandHandler : HandlerBase, ICommandHandler<string, Task<string>>
    {
        public DeleteTodoItemCommandHandler(IDbContext context) : base(context)
        {
        }

        public async Task<string> ExecuteAsync(string input)
        {
            var gInput = Guid.Parse(input);

            var item = _context.TodoItems.FirstOrDefault(p => p.Id == gInput);

            if (item != null)
            {
                var containsTags = _context.TodoItemTags.Any(p => p.TodoItemId == gInput);
                if (containsTags)
                {

                    var tags = _context.TodoItemTags.Where(p => p.TodoItemId == gInput);
                    _context.TodoItemTags.RemoveRange(tags);
                }

                _context.TodoItems.Remove(item);
                await _context.SaveChangesAsync();
                return await Task.FromResult(input);
            }

            return await Task.FromResult(string.Empty);
        }
    }
}
