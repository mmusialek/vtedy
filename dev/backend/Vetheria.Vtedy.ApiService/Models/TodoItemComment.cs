using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vetheria.Vtedy.ApiService.Models
{
    public class TodoItemComment : Comment
    {
        public Guid TodoitemId { get; set; }
        public UserAccount CreatedBy { get; set; }
    }
}
