using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.DataAccess.DataProviders
{
    public class ProjectsCommentDataProvider : IProjectsCommentDataProvider
    {
        private IConnectionFactory _connectionFactory;

        public ProjectsCommentDataProvider(IConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<ProjectComment>> Get(int projectId)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QueryAsync<ProjectComment>(
                    "[dbo].[ProjectsComment_get]",
                    param: new
                    {
                        @projectId = projectId
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<ProjectComment> Add(ProjectComment item)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QuerySingleAsync<ProjectComment>(
                    "[dbo].[ProjectsComment_add]",
                    param: new
                    {
                        @userAccountId = item.UserAccountId,
                        @content = item.Content,
                        @projectId = item.ProjectId
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }

        public async Task<ProjectComment> Update(ProjectComment item)
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QuerySingleAsync<ProjectComment>(
                    "[dbo].[ProjectsComment_update]",
                    param: new
                    {
                        @projectCommentId = item.Id,
                        @content = item.Content
                    },
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
