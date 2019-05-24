using Dapper.FluentMap.Mapping;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.DataAccess.Mappings
{
    internal class TagMapping : EntityMap<Tag>
    {
        internal TagMapping()
        {
            Map(p => p.Id).ToColumn("TagId");
        }
    }
}
