using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vetheria.Vtedy.ApiService.Dto
{
    public class TodoItemTagDto
    {
        public int Id { get; set; }
        public Guid TodoItemId { get; set; }
        public int TagId { get; set; }
    }
}
