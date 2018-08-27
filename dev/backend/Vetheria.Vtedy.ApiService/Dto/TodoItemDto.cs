using System.Collections.Generic;

namespace Vetheria.Vtedy.ApiService.Dto
{
    public class TodoItemDto
    {
        public string Id { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }

        public ProjectDto Project { get; set; }
        public List<TagDto> Tags { get; set; } = new List<TagDto>();
    }
}
