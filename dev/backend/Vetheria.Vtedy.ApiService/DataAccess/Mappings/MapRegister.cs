using Dapper.FluentMap;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vetheria.Vtedy.ApiService.DataAccess.Mappings
{
    internal class MapRegister
    {
        public static void Register()
        {
            FluentMapper.Initialize(config =>
            {
                config.AddMap(new TagMapping());
                config.AddMap(new TodoItemMapping());
                config.AddMap(new UserAccountMapping());
            });
        }
    }
}
