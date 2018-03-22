using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vetheria.VtedyService.Dtos
{
    public class TagDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<TodoItemDto> TodoItems { get; set; }
    }
}
