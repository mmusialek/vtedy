using System.Collections.Generic;
using System.Threading.Tasks;

namespace Vetheria.Vtedy.ApiService.DataAccess.Queries
{
    public interface IDataProvider<T>
    {
        Task<IEnumerable<T>> GetAsync();
    }
}