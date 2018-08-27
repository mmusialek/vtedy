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
        private readonly ICommandHandler<string, Task<Result<string>>> _deleteTodoItemCommandHandler;
        private readonly ICommandHandler<TodoItem, Task<Result<string>>> _addTodoItemCommandHandler;
        private readonly IMapper _mapper;

        public TodoItemsController(
            IQueryHandler<Task<IEnumerable<TodoItem>>> getTodoItemsQueryHandler,
            IQueryHandler<string, Task<TodoItem>> getTodoItemByIdQueryHandler,
            ICommandHandler<string, Task<Result<string>>> deleteTodoItemCommandHandler,
            ICommandHandler<TodoItem, Task<Result<string>>> addTodoItemCommandHandler,
            IMapper mapper
            )
        {
            _getTodoItemsQueryHandler = getTodoItemsQueryHandler;
            _getTodoItemByIdQueryHandler = getTodoItemByIdQueryHandler;
            _deleteTodoItemCommandHandler = deleteTodoItemCommandHandler;
            _addTodoItemCommandHandler = addTodoItemCommandHandler;
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
        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> GetAsync(string id)
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
        public async Task<IActionResult> PostAsync([FromBody]TodoItem item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            var res = await _addTodoItemCommandHandler.ExecuteAsync(item);


            return CreatedAtRoute("Get", new { id = item.Id }, item);
        }

        // PUT: api/Todo/5
        //[HttpPut("{id}")]
        //public IActionResult Put(int id, [FromBody]TodoItem item)
        //{
        //    if (item == null || item.Id != id)
        //    {
        //        return BadRequest();
        //    }

        //    var todo = _context.TodoItems.FirstOrDefault(t => t.Id == id);
        //    if (todo == null)
        //    {
        //        return NotFound();
        //    }

        //    todo.IsCompleted = item.IsCompleted;
        //    todo.Name = item.Name;

        //    _context.TodoItems.Update(todo);
        //    _context.SaveChanges();
        //    return new NoContentResult();
        //}

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(string id)
        {
            var res = await _deleteTodoItemCommandHandler.ExecuteAsync(id);
            if (!res.IsSuccess)
            {
                return NotFound();
            }

            return new NoContentResult();
        }
    }
}
