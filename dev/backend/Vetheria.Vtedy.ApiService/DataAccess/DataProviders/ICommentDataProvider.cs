using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.DataAccess.DataProviders
{
    public interface ICommentDataProvider
    {
        Task<IEnumerable<Comment>> Get(CommentFilter filter);
        Task<Comment> Add(Comment comment);
        Task<Comment> Update(Comment comment);
        Task Delete(int userAccountId, string commentId);
    }
}
