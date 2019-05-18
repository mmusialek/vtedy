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
                        @userAccountId = filter.UserAccountId,
                        @projectId = filter.ProjectId,
                        @isCurrent = filter.IsCurrentItem,
                        @statusId = filter.StatusId,
                        @todoItemId = filter.TodoItemId
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<TodoItem> GetById(string todoItemId, int userAccountId)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                var reader = await sqlConnection.QueryMultipleAsync(
                    "[dbo].[TodoItems_GetById]",
                    param: new
                    {
                        @userAccountId = userAccountId,
                        @todoItemId = todoItemId
                    },
                    commandType: CommandType.StoredProcedure);

                var res = reader.Read<TodoItem, Project, TodoItem>((todoItem, project) =>
                {
                    todoItem.Project = project;
                    return todoItem;
                },
                splitOn: "ProjectId").Single();

                res.Tags = reader.Read<Tag>();

                return res;
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
                        @isCurrent = todoItem.IsCurrent,
                        @statusId = todoItem.StatusId,
                        @name = todoItem.Name,
                        @projectId = todoItem.ProjectId
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<TodoItem> Update(TodoItem item)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QuerySingleAsync<TodoItem>(
                    "[dbo].[TodoItems_update]",
                    param: new
                    {
                        @id = item.Id,
                        @name = item.Name,
                        @isCurrent = item.IsCurrent,
                        @statusId = item.StatusId,
                        @projectId = item.ProjectId
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<int> Delete(string todoitemId, int userAccountId)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QuerySingleAsync<int>(
                    "[dbo].[TodoItems_delete]",
                    param: new
                    {
                        @userAccountId = userAccountId,
                        @todoitemId = todoitemId
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<TodoItemTag> AddTag(string todoItemId, int tagId)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QuerySingleAsync<TodoItemTag>(
                    "[dbo].[TodoItems_Tag_add]",
                    param: new
                    {
                        @todoItemId = todoItemId,
                        @tagId = tagId
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<TodoItemTag> AddTag(string todoItemId, string tagName)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QuerySingleAsync<TodoItemTag>(
                    "[dbo].[TodoItems_Tag_add]",
                    param: new
                    {
                        @todoItemId = todoItemId,
                        @tagName = tagName
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<int> DeleteTag(string todoItemId, int todoItemTagId)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QuerySingleAsync<int>(
                    "[dbo].[TodoItems_Tag_delete]",
                    param: new
                    {
                        @todoItemId = todoItemId,
                        @todoItemTagId = todoItemTagId
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<IEnumerable<Tag>> GetTag(string todoItemId, string name)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QueryAsync<Tag>(
                    "[dbo].[TodoItems_Tag_get]",
                    param: new
                    {
                        @todoItemId = todoItemId,
                        @name = name
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
