using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using Vetheria.Vtedy.DataModel.Model;
using Dapper;
using System.Data;

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
                    "dbo.Projects_Get",
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
