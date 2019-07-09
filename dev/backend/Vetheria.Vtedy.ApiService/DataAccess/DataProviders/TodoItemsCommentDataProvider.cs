using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.DataAccess.DataProviders
{
    public class TodoItemsCommentDataProvider : ITodoItemsCommentDataProvider
    {
        private IConnectionFactory _connectionFactory;

        public TodoItemsCommentDataProvider(IConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<TodoItemComment>> Get(string todoItemId)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QueryAsync<TodoItemComment, UserAccount, TodoItemComment>(
                    "[dbo].[TodoItemsComment_get]",
                    (todoItem, userAccount) =>
                    {
                        todoItem.CreatedBy = userAccount;
                        return todoItem;
                    },
                    param: new
                    {
                        @todoitemId = todoItemId
                    },
                    splitOn: "UserAccountId",
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<TodoItemComment> Add(TodoItemComment item)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QuerySingleAsync<TodoItemComment>(
                    "[dbo].[TodoItemsComment_add]",
                    param: new
                    {
                        @userAccountId = item.UserAccountId,
                        @content = item.Content,
                        @todoItemId = item.TodoitemId
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<TodoItemComment> Update(TodoItemComment item)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QuerySingleAsync<TodoItemComment>(
                    "[dbo].[TodoItemsComment_update]",
                    param: new
                    {
                        @todoItemCommentId = item.Id,
                        @content = item.Content
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }


        public async Task<int> Delete(string todoItemId, string todoItemCommentId)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QuerySingleAsync<int>(
                    "[dbo].[TodoItemsComment_delete]",
                    param: new
                    {
                        @todoItemId = todoItemId,
                        @todoItemCommentId = todoItemCommentId
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

    }
}
