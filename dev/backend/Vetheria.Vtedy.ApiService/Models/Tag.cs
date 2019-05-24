using System;

namespace Vetheria.Vtedy.ApiService.Models
{
    public class Tag
    {
        public int Id { get; set; }
        public int TodoItemTagId { get; set; }
        public Guid TodoItemId { get; set; }
        public string Name { get; set; }
    }
}
