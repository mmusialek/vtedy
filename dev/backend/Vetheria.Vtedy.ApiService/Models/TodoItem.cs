using System;

namespace Vetheria.Vtedy.ApiService.Models
{
    public class TodoItem
    {
        public Guid Id { get; set; }
        public string Name { get; set; }
        public bool IsCompleted { get; set; }
        public int ProjectId { get; set; }
    }
}
