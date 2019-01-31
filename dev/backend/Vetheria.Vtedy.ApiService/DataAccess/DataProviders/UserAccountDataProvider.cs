using Dapper;
using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using Vetheria.Vtedy.ApiService.DataAccess.Queries;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.DataAccess.DataProviders
{
    public class UserAccountDataProvider : IDataProvider<UserAccount>
    {
        private IConnectionFactory _connectionFactory;

        public UserAccountDataProvider(IConnectionFactory connectionFactory)
        {
            _connectionFactory = connectionFactory;
        }

        public async Task<IEnumerable<UserAccount>> GetAsync()
        {
            using (var sqlConnection = _connectionFactory.OpenSqlConnection())
            {
                return await sqlConnection.QueryAsync<UserAccount>(
                    "[dbo].[UserAccounts_get]",
                    commandType: CommandType.StoredProcedure);
            }
        }
    }
}
