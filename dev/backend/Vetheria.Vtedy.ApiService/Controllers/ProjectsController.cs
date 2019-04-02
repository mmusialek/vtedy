using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vetheria.Vtedy.ApiService.DataAccess.DataProviders;
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
        private IProjectsCommentDataProvider _projectsCommentDataProvider;
        private IMapper _mapper;

        public ProjectsController(IProjectDataProvider dataProvider, IProjectsCommentDataProvider projectsCommentDataProvider, IMapper mapper)
        {
            _dataProvider = dataProvider;
            _projectsCommentDataProvider = projectsCommentDataProvider;
            _mapper = mapper;
        }

        // GET: api/Projects
        [HttpGet]
        public async Task<IActionResult> Get()
        {
            // TODO get user id from token
            var userId = 1;
            var projects = await _dataProvider.GetByUserIdAsync(userId);
            var res = _mapper.Map<List<ProjectDto>>(projects);

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
            var res = _mapper.Map<ProjectDto>(projects);

            var resObj = new ObjectResult(res);
            return resObj;
        }

        // POST: api/Projects
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] ProjectDto projectDto)
        {
            // TODO get user id from token
            var userId = 1;

            var project = _mapper.Map<Project>(projectDto);
            project.UserAccountId = userId;
            var projectModel = await _dataProvider.Add(project);
            var res = _mapper.Map<ProjectDto>(projectModel);

            var resObj = new ObjectResult(res);
            return resObj;
        }

        // PUT: api/Projects/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] ProjectDto projectDto)
        {            // TODO get user id from token
            var userId = 1;

            // TODO create converter
            var project = _mapper.Map<Project>(projectDto);
            project.UserAccountId = userId;
            var projectModel = await _dataProvider.UpdateAsync(project);
            var res = _mapper.Map<ProjectDto>(projectModel);

            var resObj = new ObjectResult(res);
            return resObj;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return null;
        }


        // comments



        // GET: api/Projects
        [HttpGet("{id}/comments")]
        public async Task<IActionResult> Get(int id)
        {
            var projectComments = await _projectsCommentDataProvider.Get(id);

            var res = _mapper.Map<List<ProjectCommentDto>>(projectComments);

            var resObj = new ObjectResult(res);
            return resObj;
        }


        // GET: api/Projects
        [HttpPost("{id}/comments")]
        public async Task<IActionResult> AddComment(int id, [FromBody] ProjectCommentRequestDto comment)
        {
            // TODO get user id from token
            var userId = 1;

            var item = _mapper.Map<ProjectComment>(comment);
            item.UserAccountId = userId;
            item.ProjectId = id;
            var projectComment = await _projectsCommentDataProvider.Add(item);
            var resDto = _mapper.Map<ProjectCommentDto>(projectComment);

            var resObj = new ObjectResult(resDto);
            return resObj;
        }


        // GET: api/Projects
        [HttpPut("{id}/comments")]
        public async Task<IActionResult> PutComment(int id, [FromBody] ProjectCommentRequestDto comment)
        {
            // TODO get user id from token            
            var userId = 1;

            // TODO: Validation - check if request.userAccountId match comment.userAccountId

            var item = _mapper.Map<ProjectComment>(comment);
            item.UserAccountId = userId;
            item.ProjectId = id;
            var projectComment = await _projectsCommentDataProvider.Update(item);
            var resDto = _mapper.Map<ProjectCommentDto>(projectComment);

            var resObj = new ObjectResult(resDto);
            return resObj;
        }


    }
}
