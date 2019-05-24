using Dapper.FluentMap.Mapping;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.DataAccess.Mappings
{
    public class TodoItemMapping : EntityMap<TodoItem>
    {
        internal TodoItemMapping()
        {
            Map(p => p.Id).ToColumn("TodoItemId");
        }
    }

}
