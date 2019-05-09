using System;
using System.Collections.Generic;

namespace Vetheria.Vtedy.ApiService.Dto
{
    public class ProjectDto
    {
        public int ProjectId { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }
        public DateTime ReleaseAt { get; set; }
        public bool? IsDefault { get; set; }

        //        public List<TodoItemDto> TodoItemDtos { get; set; } = new List<TodoItemDto>();
    }
}
