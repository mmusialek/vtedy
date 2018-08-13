using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace Vetheria.Vtedy.DataModel.Model
{
    public class Project
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Description { get; set; }

        public virtual ICollection<TodoItem> TodoItems { get; set; }
        public virtual ICollection<VtedyIdentityUser> Users { get; set; }
    }
}
