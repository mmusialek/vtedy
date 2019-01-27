using System;
using System.Collections.Generic;
using System.Text;

namespace Vetheria.Vtedy.DataModel.Model
{
    public class TodoItemTag
    {
        public int Id { get; set; }
        public Guid TodoItemId { get; set; }
        public int TagId { get; set; }
    }
}
