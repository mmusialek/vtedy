using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vetheria.Vtedy.ApiService.Dto
{
    public abstract class CommentDto
    {
        public string Id { get; set; }
        public int UserAccountId { get; set; }
        public string Content { get; set; }
        public DateTime CreatedDate { get; set; }
        public DateTime? ModifiedDate { get; set; }
    }


    public class ProjectCommentDto : CommentDto
    {
        public string ProjectId { get; set; }
    }


    public class TodoitemCommentDto : CommentDto
    {
        public string TodoitemId { get; set; }
    }
}
