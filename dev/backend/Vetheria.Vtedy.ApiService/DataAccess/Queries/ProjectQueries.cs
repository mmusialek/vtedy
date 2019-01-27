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
    public class ProjectQueries
    {
        

        public static async Task<IEnumerable<Project>> GetProjectsAsync()
        {
            using (var sqlConnection = ConnectionFactory.GetSqlConnection())
            {
                return await sqlConnection.QueryAsync<Project>(
                    "SELECT [ProjectId], [Name], [Description], [UserAccountId] FROM [dbo].[Projects]",
                    commandType: CommandType.Text);
            }
        }
    }
}
