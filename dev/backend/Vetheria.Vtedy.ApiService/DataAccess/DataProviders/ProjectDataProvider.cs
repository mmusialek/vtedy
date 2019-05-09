using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Dapper;
using System.Data;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.DataAccess.Queries
{
    public class ProjectDataProvider : IProjectDataProvider
    {
        private IConnectionFactory _connectionFactory;

        public ProjectDataProvider(IConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<Project>> GetByUserIdAsync(int userId)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QueryAsync<Project>(
                    "[dbo].[Projects_Get]",
                    param: new
                    {
                        @userId = userId
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<Project> GetByProjectIdAsync(int userId, int projectId)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QuerySingleAsync<Project>(
                    "[dbo].[Project_get_by_id]",
                    param: new
                    {
                        @userId = userId,
                        @projectId = projectId
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<Project> Add(Project project)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QuerySingleAsync<Project>(
                    "[dbo].[Projects_add]",
                    param: new
                    {
                        @name = project.Name,
                        @Description = project.Description,
                        @UserAccountId = project.UserAccountId
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<Project> UpdateAsync(Project project)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QuerySingleAsync<Project>(
                    "[dbo].[Projects_update]",
                    param: new
                    {
                        @id = project.ProjectId,
                        @name = project.Name,
                        @description = project.Description,
                        @userAccountId = project.UserAccountId
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
