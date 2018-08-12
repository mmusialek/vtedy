using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vetheria.VtedyService.Dtos
{
    public class ItemfilterDto
    {
        public DateTime? DateTime { get; set; }
        public int? ProjectId { get; set; }
        public bool OnlyCurrentItems { get; set; } = false;
        public int?[] LabelIds { get; set; }
    }
}
