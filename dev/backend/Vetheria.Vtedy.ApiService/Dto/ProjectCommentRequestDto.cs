using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vetheria.Vtedy.ApiService.Dto
{
    public class ProjectCommentRequestDto
    {
        public string Id { get; set; }
        public int ProjectId { get; set; }
        public string Content { get; set; }
    }
}
