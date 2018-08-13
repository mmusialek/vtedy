using System;
using System.Collections.Generic;
using System.Text;
using Microsoft.AspNetCore.Identity;

namespace Vetheria.Vtedy.DataModel.Model
{
    public class VtedyIdentityUser : IdentityUser
    {

        public virtual Project Project { get; set; }
    }
}
