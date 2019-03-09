using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vetheria.Vtedy.ApiService.Models
{
    public class ToDoItemFilter
    {
        public int UserAccountId { get; set; }
        public int? ProjectId { get; set; }
        public bool? IsCurrentItem { get; set; }
        public int StatusId { get; set; }
    }
}
