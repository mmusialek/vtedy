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
    public class ProjectDataProvider : IDataProvider<Project>
    {
        private IConnectionFactory _connectionFactory;

        public ProjectDataProvider(IConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<Project>> GetAsync()
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QueryAsync<Project>(
                    "[dbo].[Projects_Get]",
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
