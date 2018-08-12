using System.Collections.Generic;

namespace Vetheria.Vtedy.ApiService.Dto
{
    public class TagDto
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<TodoItemDto> TodoItems { get; set; }
    }
}
