using System;
using System.Collections.Generic;
using System.Text;

namespace Vetheria.Vtedy.DataModel.Model
{
    public class TodoItemTag
    {
        public Guid TodoItemId { get; set; }
        public virtual TodoItem TodoItem{ get; set; }
        public int TagId { get; set; }
        public virtual Tag Tag { get; set; }
    }
}
