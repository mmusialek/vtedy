using System.Collections.Generic;

namespace Vetheria.Vtedy.ApiService.Dto
{
    public class TodoItemDto
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }


        public virtual ICollection<TagDto> Tags { get; set; }
    }
}
