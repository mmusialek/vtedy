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
        private IDataProvider<Project> _dataProvider;
        public ProjectsController(IDataProvider<Project> dataProvider)
        {
            _dataProvider = dataProvider;
        }
        // GET: api/Projects
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            var projects = await _dataProvider.GetAsync();
            var res = new List<ProjectDto>();

            foreach (var item in projects)
            {
                res.Add(new ProjectDto { Id = item.Id, Name = item.Name, Description = item.Description });
            }

            var resObj = new ObjectResult(res);
            return resObj;
        }

        // GET: api/Projects/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(int id)
        {
            var res = new ProjectDto { Id = id, Name = "Project " + id, ReleaseAt = DateTime.Now };

            var resObj = new ObjectResult(res);
            return resObj;
        }

        // POST: api/Projects
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] string value)
        {
            return null;
        }

        // PUT: api/Projects/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] string value)
        {
            return null;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return null;
        }
    }
}
