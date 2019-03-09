using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vetheria.Vtedy.ApiService.Dto
{
    public class ToDoItemFilterDto
    {
        public int UserAccountId { get; set; }
        public int? ProjectId { get; set; }
        public bool? IsCurrentItem { get; set; }
        public int StatusId { get; set; }

        // TODO add date, labels/tags
    }
}
