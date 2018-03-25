using System;
using System.Collections.Generic;
using System.Text;
using Vetheria.VtedyService.Database;

namespace Vetheria.Vtedy.Application.Core
{
    public class HandlerBase
    {
        protected IDbContext _context;

        public HandlerBase(IDbContext context)
        {
            _context = context;
        }
    }
}
