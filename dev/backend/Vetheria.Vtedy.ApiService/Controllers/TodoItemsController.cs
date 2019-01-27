using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Vetheria.Vtedy.ApiService.Dto;

namespace Vetheria.Vtedy.ApiService.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TodoItemsController : ControllerBase
    {
        private readonly IMapper _mapper;

        public TodoItemsController(IMapper mapper)
        {
            _mapper = mapper;
        }

        // GET: api/Todo
        [HttpGet]
        public async Task<IActionResult> Get() //IEnumerable<TodoItemDto>
        {
            var resObj = new ObjectResult(null);
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
            var resObj = new ObjectResult(null);
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
