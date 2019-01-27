using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace Vetheria.Vtedy.DataModel.Model
{
    public class UserAccount
    {
        public int Id { get; set; }
        public int UserName { get; set; }
        public int Email { get; set; }
        public int Password { get; set; }
    }
}
