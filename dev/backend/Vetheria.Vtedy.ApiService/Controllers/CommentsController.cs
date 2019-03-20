using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Vetheria.Vtedy.ApiService.Dto;

namespace Vetheria.Vtedy.ApiService.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentsController : ControllerBase
    {
        // GET: api/Comments
        [HttpGet]
        public async Task<IActionResult> Get([FromQuery] CommentFilterDto filter)
        {
            return new NoContentResult();
        }

        // GET: api/Comments/5
        [HttpGet("{id}", Name = "Get")]
        public async Task<IActionResult> Get(int id)
        {
            return new NoContentResult();
        }

        // POST: api/Comments
        [HttpPost]
        public async Task<IActionResult> Post([FromBody] CommentDto coment)
        {
            return new NoContentResult();
        }

        // PUT: api/Comments/5
        [HttpPut("{id}")]
        public async Task<IActionResult> Put(int id, [FromBody] CommentDto coment)
        {
            return new NoContentResult();
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            return new NoContentResult();
        }
    }
}
