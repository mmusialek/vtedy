using System.Collections.Generic;
using System.Threading.Tasks;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.DataAccess.DataProviders
{
    public interface ITodoItemDataProvider
    {
        Task<IEnumerable<TodoItem>> Get(ToDoItemFilter filter);
        Task<TodoItem> GetById(string todoItemId, int userAccountId);
        Task<TodoItem> Add(TodoItem todoItem, int userAccountId);
        Task<TodoItem> Update(TodoItem item);
        Task<int> Delete(string todoitemId, int userAccountId);
        Task<TodoItemTag> AddTag(string todoItemId, int tagId);
        Task<TodoItemTag> AddTag(string todoItemId, string tagName);
        Task<int> DeleteTag(string todoItemId, int todoItemTagId);
        Task<IEnumerable<Tag>> GetTag(string todoItemId, string name);
    }
}