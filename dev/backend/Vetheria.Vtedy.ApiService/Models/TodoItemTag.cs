using System;

namespace Vetheria.Vtedy.ApiService.Models
{
    public class TodoItemTag
    {
        public int Id { get; set; }
        public Guid TodoItemId { get; set; }
        public int TagId { get; set; }
    }
}
