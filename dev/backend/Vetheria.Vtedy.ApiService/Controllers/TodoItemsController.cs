using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vetheria.Vtedy.Application.Core;
using Vetheria.Vtedy.Application.Handlers;
using Vetheria.VtedyService.Database;
using Vetheria.VtedyService.Models;

namespace Vetheria.VtedyService.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TodoItemsController : Controller
    {
        private IQueryHandler<Task<IEnumerable<TodoItem>>> _getTodoItemsQueryHandler;
        private IQueryHandler<int, Task<Result<TodoItem>>> _getTodoItemByIdQueryHandler;
        private ICommandHandler<int, Task<Result<long>>> _deleteTodoItemCommandHandler;
        private ICommandHandler<TodoItem, Task<Result<long>>> _addTodoItemCommandHandler;

        public TodoItemsController(
            IQueryHandler<Task<IEnumerable<TodoItem>>> getTodoItemsQueryHandler,
            IQueryHandler<int, Task<Result<TodoItem>>> getTodoItemByIdQueryHandler,
            ICommandHandler<int, Task<Result<long>>> deleteTodoItemCommandHandler,
            ICommandHandler<TodoItem, Task<Result<long>>> addTodoItemCommandHandler
            )
        {
            _getTodoItemsQueryHandler = getTodoItemsQueryHandler;
            _getTodoItemByIdQueryHandler = getTodoItemByIdQueryHandler;
            _deleteTodoItemCommandHandler = deleteTodoItemCommandHandler;
            _addTodoItemCommandHandler = addTodoItemCommandHandler;
        }

        // GET: api/Todo
        [HttpGet]
        public async Task<IEnumerable<TodoItem>> Get()
        {
            var res = await _getTodoItemsQueryHandler.Execute();
            return res;
        }

        // GET: api/Todo/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> GetAsync(int id)
        {
            var res = await _getTodoItemByIdQueryHandler.ExecuteAsync(id);

            if (!res.IsSuccess)
            {
                return NotFound();
            }

            return new ObjectResult(res);
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

        //    todo.IsComplete = item.IsComplete;
        //    todo.Name = item.Name;

        //    _context.TodoItems.Update(todo);
        //    _context.SaveChanges();
        //    return new NoContentResult();
        //}

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteAsync(int id)
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
