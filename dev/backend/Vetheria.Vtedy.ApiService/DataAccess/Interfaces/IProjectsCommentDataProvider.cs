using System.Collections.Generic;
using System.Threading.Tasks;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.DataAccess.DataProviders
{
    public interface IProjectsCommentDataProvider
    {
        Task<ProjectComment> Add(ProjectComment item);
        Task<IEnumerable<ProjectComment>> Get(int projectId);
        Task<ProjectComment> Update(ProjectComment item);
    }
}