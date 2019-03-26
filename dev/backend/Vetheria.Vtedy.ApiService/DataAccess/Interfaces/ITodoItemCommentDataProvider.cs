using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.DataAccess.DataProviders
{
    public interface ITodoItemsCommentDataProvider
    {
        Task<IEnumerable<TodoItemComment>> Get(int todoItemId);
        Task<TodoItemComment> Add(TodoItemComment comment);
        Task<TodoItemComment> Update(TodoItemComment comment);
    }
}
