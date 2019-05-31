using Dapper.FluentMap.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.DataAccess.Mappings
{
    internal class UserAccountMapping : EntityMap<UserAccount>
    {
        internal UserAccountMapping()
        {
            Map(p => p.Id).ToColumn("UserAccountId");
        }
    }
}
