using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Vetheria.Vtedy.ApiService.Dto;
using Vetheria.Vtedy.Application.Core;
using Vetheria.Vtedy.DataModel.Model;

namespace Vetheria.Vtedy.ApiService.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TodoItemsController : Controller
    {
        private readonly IQueryHandler<Task<IEnumerable<TodoItem>>> _getTodoItemsQueryHandler;
        private readonly IQueryHandler<string, Task<TodoItem>> _getTodoItemByIdQueryHandler;
        private readonly ICommandHandler<string, Task<string>> _deleteTodoItemCommandHandler;
        private readonly ICommandHandler<TodoItem, Task<Result<string>>> _addTodoItemCommandHandler;
        private readonly ICommandHandler<TodoItem, Task<TodoItem>> _updateAllTodoItemCommandHandler;
        private readonly IMapper _mapper;

        public TodoItemsController(
            IQueryHandler<Task<IEnumerable<TodoItem>>> getTodoItemsQueryHandler,
            IQueryHandler<string, Task<TodoItem>> getTodoItemByIdQueryHandler,
            ICommandHandler<string, Task<string>> deleteTodoItemCommandHandler,
            ICommandHandler<TodoItem, Task<Result<string>>> addTodoItemCommandHandler,
            ICommandHandler<TodoItem, Task<TodoItem>> updateAllTodoItemCommandHandler,
            IMapper mapper)
        {
            _getTodoItemsQueryHandler = getTodoItemsQueryHandler;
            _getTodoItemByIdQueryHandler = getTodoItemByIdQueryHandler;
            _deleteTodoItemCommandHandler = deleteTodoItemCommandHandler;
            _addTodoItemCommandHandler = addTodoItemCommandHandler;
            _updateAllTodoItemCommandHandler = updateAllTodoItemCommandHandler;
            _mapper = mapper;
        }

        // GET: api/Todo
        [HttpGet]
        public async Task<IActionResult> Get() //IEnumerable<TodoItemDto>
        {
            var res = await _getTodoItemsQueryHandler.Execute();
            var dto = _mapper.Map<IEnumerable<TodoItemDto>>(res);

            if (res == null)
            {
                return NotFound();
            }

            var resObj = new ObjectResult(dto);
            return resObj;
        }

        // GET: api/Todo/5
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(string id)
        {
            var res = await _getTodoItemByIdQueryHandler.ExecuteAsync(id);

            if (res == null)
            {
                return NotFound();
            }

            var dto = _mapper.Map<TodoItemDto>(res);


            var resObj = new ObjectResult(dto);
            return resObj;
        }

        // POST: api/Todo
        [HttpPost]
        public async Task<IActionResult> PostAsync([FromBody]TodoItemDto item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            // TODO convert
            var itemModel = _mapper.Map<TodoItem>(item);
            var modelRes = await _addTodoItemCommandHandler.ExecuteAsync(itemModel);


            // TODO convert modelRes to dto res

            return CreatedAtRoute("Get", new { id = item.Id }, item);
        }

        // PUT: api/Todo/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(string id, [FromBody]TodoItemDto item)
        {
            if (item == null || item.Id != id)
            {
                return BadRequest();
            }

            var itemModel = _mapper.Map<TodoItem>(item);
            var modelRes = await _updateAllTodoItemCommandHandler.ExecuteAsync(itemModel);

            var res = _mapper.Map<TodoItemDto>(modelRes);
            return CreatedAtRoute("Get", new { id }, res);
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            var res = await _deleteTodoItemCommandHandler.ExecuteAsync(id);
            if (string.IsNullOrEmpty(res))
            {
                return NotFound();
            }

            return new NoContentResult();
        }
    }
}
