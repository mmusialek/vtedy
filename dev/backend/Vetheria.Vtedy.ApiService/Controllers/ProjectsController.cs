using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vetheria.Vtedy.ApiService.DataAccess.Queries;
using Vetheria.Vtedy.ApiService.Dto;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    [ApiController]
    public class ProjectsController : ControllerBase
    {
        private IProjectDataProvider _dataProvider;
        public ProjectsController(IProjectDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }
        // GET: api/Projects
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            // TODO get user id from token
            var userId = 1;
            var projects = await _dataProvider.GetByUserIdAsync(userId);
            var res = new List<ProjectDto>();

            foreach (var item in projects)
            {
                res.Add(new ProjectDto { Id = item.Id, Name = item.Name, Description = item.Description });
            }

            var resObj = new ObjectResult(res);
            return resObj;
        }

        // GET: api/Projects/5
        [HttpGet("{projectId}")]
        public async Task<IActionResult> GetById(int projectId)
        {
            // TODO get user id from token
            var userId = 1;
            var projects = await _dataProvider.GetByProjectIdAsync(userId, projectId);
            var res = new List<ProjectDto>();

            foreach (var item in projects)
            {
                res.Add(new ProjectDto { Id = item.Id, Name = item.Name, Description = item.Description });
            }

            var resObj = new ObjectResult(res);
            return resObj;
        }

        // POST: api/Projects
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProjectDto projectDto)
        {
            // TODO get user id from token
            var userId = 1;

            // TODO create converter
            var project = new Project
            {
                Name = projectDto.Name,
                Description = projectDto.Description,
                UserAccountId = userId
            };

            var projectModel = await _dataProvider.Add(project);

            var res = new ProjectDto
            {
                Id = projectModel.Id,
                Name = projectModel.Name,
                Description = projectModel.Description
            };

            var resObj = new ObjectResult(res);
            return resObj;
        }

        // PUT: api/Projects/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ProjectDto projectDto)
        {            // TODO get user id from token
            var userId = 1;

            // TODO create converter
            var project = new Project
            {
                Id = id,
                Name = projectDto.Name,
                Description = projectDto.Description,
                UserAccountId = userId
            };

            var projectModel = await _dataProvider.UpdateAsync(project);

            var res = new ProjectDto
            {
                Id = projectModel.Id,
                Name = projectModel.Name,
                Description = projectModel.Description
            };

            var resObj = new ObjectResult(res);
            return resObj;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return null;
        }
    }
}
