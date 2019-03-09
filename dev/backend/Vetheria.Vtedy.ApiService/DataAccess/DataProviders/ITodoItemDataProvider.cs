using System.Collections.Generic;
using System.Threading.Tasks;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.DataAccess.DataProviders
{
    public interface ITodoItemDataProvider
    {
        Task<IEnumerable<TodoItem>> Get(ToDoItemFilter filter);
        Task<TodoItem> Add(TodoItem todoItem, int userAccountId);
        Task<TodoItem> Update(TodoItem item);
    }
}