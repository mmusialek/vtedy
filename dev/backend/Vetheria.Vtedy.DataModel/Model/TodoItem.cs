using System.Collections.Generic;

namespace Vetheria.Vtedy.DataModel.Model
{
    public class TodoItem
    {
        public long Id { get; set; }
        public string Name { get; set; }
        public bool IsComplete { get; set; }


        public virtual ICollection<Tag> Tags { get; set; }
    }
}
