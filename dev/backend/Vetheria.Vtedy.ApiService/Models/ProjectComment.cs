﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vetheria.Vtedy.ApiService.Models
{
    public class ProjectComment : Comment
    {
        public int ProjectId { get; set; }
    }
}
