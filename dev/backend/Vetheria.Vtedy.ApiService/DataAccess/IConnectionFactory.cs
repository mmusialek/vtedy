using System.Data.SqlClient;

namespace Vetheria.Vtedy.ApiService.DataAccess
{
    public interface IConnectionFactory
    {
        SqlConnection OpenSqlConnection();
    }
}