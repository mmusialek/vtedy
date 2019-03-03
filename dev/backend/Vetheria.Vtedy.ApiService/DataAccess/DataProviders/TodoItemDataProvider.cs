using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.DataAccess.DataProviders
{
    public class TodoItemDataProvider : ITodoItemDataProvider
    {
        private IConnectionFactory _connectionFactory;

        public TodoItemDataProvider(IConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<TodoItem>> Get(ToDoItemFilter filter)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QueryAsync<TodoItem>(
                    "[dbo].[TodoItems_get]",
                    param: new
                    {
                        @userAccountId = filter.UserAccountId
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<TodoItem> Add(TodoItem todoItem, int userAccountId)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QuerySingleAsync<TodoItem>(
                    "[dbo].[TodoItems_add]",
                    param: new
                    {
                        @userAccountId = userAccountId,
                        @isCompleted = todoItem.IsCompleted,
                        @name = todoItem.Name,
                        @projectId = todoItem.ProjectId
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
