using System.Collections.Generic;

namespace Vetheria.Vtedy.DataModel.Model
{
    public class Tag
    {
        public int Id { get; set; }
        public string Name { get; set; }

        public virtual ICollection<TodoItem> TodoItems { get; set; }
    }
}
