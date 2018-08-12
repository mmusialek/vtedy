using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vetheria.VtedyService.Dtos
{
    public class TodoItemDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsCompleted { get; set; }


        public virtual ICollection<TagDto> Tags { get; set; }
    }
}
