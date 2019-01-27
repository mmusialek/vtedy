using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;

namespace Vetheria.Vtedy.ApiService.DataAccess
{
    public class ConnectionFactory
    {
        private static readonly string connectionString = "Server=(localdb)\\v13.0;Database=VtedyDatabase;Trusted_Connection=True;MultipleActiveResultSets=true";

        public static SqlConnection GetSqlConnection()
        {
            var connection = new SqlConnection(connectionString);
            connection.Open();
            return connection;
        }
    }
}
