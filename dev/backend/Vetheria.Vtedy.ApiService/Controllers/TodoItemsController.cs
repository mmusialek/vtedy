using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Vetheria.Vtedy.ApiService.DataAccess.DataProviders;
using Vetheria.Vtedy.ApiService.Dto;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TodoItemsController : ControllerBase
    {
        private ITodoItemDataProvider _dataProvider;
        public TodoItemsController(ITodoItemDataProvider dataProvider)
        {
            _dataProvider = dataProvider;
        }

        // GET: api/Todo
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] ToDoItemFilterDto parm) //IEnumerable<TodoItemDto>
        {
            var res = new List<TodoItemDto>();
            // TODO get user id from token
            var userId = 1;


            var filter = new ToDoItemFilter();
            filter.UserAccountId = userId;

            var todos = await _dataProvider.Get(filter);

            // TODO user automapper
            foreach (var item in todos)
            {
                var todo = new TodoItemDto
                {
                    Id = item.Id.ToString(),
                    IsCompleted = item.IsCompleted,
                    Name = item.Name,
                    Project = new ProjectDto { Id = item.ProjectId }
                };
                res.Add(todo);
            }

            var resObj = new ObjectResult(res);
            return resObj;
        }

        // GET: api/Todo/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var resObj = new ObjectResult(null);
            return resObj;
        }

        // POST: api/Todo
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody]TodoItemDto item)
        {
            // TODO get user id from token
            var userAccountId = 1;
            var todo = new TodoItem
            {
                IsCompleted = item.IsCompleted,
                Name = item.Name,
                ProjectId = item.Project.Id
            };

            var addedItem = await _dataProvider.Add(todo, userAccountId);
            
            // TODO user automapper
            var res = new TodoItemDto
            {
                Id = addedItem.Id.ToString(),
                IsCompleted = addedItem.IsCompleted,
                Name = addedItem.Name
            };


            var resObj = new ObjectResult(res);
            return resObj;
        }

        // PUT: api/Todo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody]TodoItemDto item)
        {
            var resObj = new ObjectResult(null);
            return resObj;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            return new NoContentResult();
        }
    }
}
