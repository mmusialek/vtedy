using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vetheria.Vtedy.ApiService.DataAccess.Queries;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.DataAccess
{
    public interface IUserAccountDataProvider : IDataProvider<UserAccount>
    {
        Task<UserAccount> GetAsync(string userName);
        Task<UserAccount> GetByIdAsync(int userId);
    }
}
