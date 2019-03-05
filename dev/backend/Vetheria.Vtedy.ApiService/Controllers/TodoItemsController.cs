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
        private IMapper _mapper;

        public TodoItemsController(ITodoItemDataProvider dataProvider, IMapper mapper)
        {
            _dataProvider = dataProvider;
            _mapper = mapper;
        }

        // GET: api/Todo
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] ToDoItemFilterDto filterDto) //IEnumerable<TodoItemDto>
        {
            // TODO get user id from token
            var userId = 1;


            var filter = _mapper.Map<ToDoItemFilter>(filterDto);
            filter.UserAccountId = userId;

            var todos = await _dataProvider.Get(filter);
            var res = _mapper.Map<List<TodoItemDto>>(todos);

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
            var todo = _mapper.Map<TodoItem>(item);


            var addedItem = await _dataProvider.Add(todo, userAccountId);
            var res = _mapper.Map<TodoItemDto>(addedItem);

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
