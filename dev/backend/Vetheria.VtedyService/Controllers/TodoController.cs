using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vetheria.VtedyService.Database;
using Vetheria.VtedyService.Models;

namespace Vetheria.VtedyService.Controllers
{
    [Produces("application/json")]
    [Route("api/Todo")]
    public class TodoController : Controller
    {
        private VtedyContext _context;

        public TodoController(VtedyContext context)
        {
            _context = context;

            if (_context.TodoItems.Count() == 0)
            {
                _context.TodoItems.Add(new TodoItem { Name = "Item1" });
                _context.SaveChanges();
            }
        }

        // GET: api/Todo
        [HttpGet]
        public IEnumerable<TodoItem> Get()
        {
            return _context.TodoItems.ToList();
        }

        // GET: api/Todo/5
        [HttpGet("{id}", Name = "Get")]
        public IActionResult Get(int id)
        {
            var item = _context.TodoItems.FirstOrDefault(p => p.Id == id);

            if(item == null)
            {
                return NotFound();
            }

            return new ObjectResult(item);
        }
        
        // POST: api/Todo
        [HttpPost]
        public IActionResult Post([FromBody]TodoItem item)
        {
            if (item == null)
            {
                return BadRequest();
            }

            _context.TodoItems.Add(item);
            _context.SaveChanges();

            return CreatedAtRoute("Get", new { id = item.Id }, item);
        }
        
        // PUT: api/Todo/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody]TodoItem item)
        {
            if (item == null || item.Id != id)
            {
                return BadRequest();
            }

            var todo = _context.TodoItems.FirstOrDefault(t => t.Id == id);
            if (todo == null)
            {
                return NotFound();
            }

            todo.IsComplete = item.IsComplete;
            todo.Name = item.Name;

            _context.TodoItems.Update(todo);
            _context.SaveChanges();
            return new NoContentResult();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var todo = _context.TodoItems.FirstOrDefault(t => t.Id == id);
            if (todo == null)
            {
                return NotFound();
            }

            _context.TodoItems.Remove(todo);
            _context.SaveChanges();
            return new NoContentResult();
        }
    }
}
