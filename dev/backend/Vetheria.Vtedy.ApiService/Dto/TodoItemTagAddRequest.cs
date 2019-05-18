using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vetheria.Vtedy.ApiService.Dto
{
    public class TodoItemTagAddRequest
    {
        public int TagId { get; set; }
        public string TagName { get; set; }
    }
}
