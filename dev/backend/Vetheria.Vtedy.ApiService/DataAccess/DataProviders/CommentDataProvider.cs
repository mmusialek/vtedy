using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.DataAccess.DataProviders
{
    public class CommentDataProvider : ICommentDataProvider
    {
        public async Task<IEnumerable<Comment>> Get(CommentFilter filter)
        {
            return null;
        }

        public Task<Comment> Add(Comment comment)
        {
            return null;
        }

        public Task<Comment> Update(Comment comment)
        {
            return null;
        }

        public Task Delete(int userAccountId, string commentId)
        {
            return null;
        }

    }
}
