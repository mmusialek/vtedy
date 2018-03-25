using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Vetheria.Vtedy.Application.Core;
using Vetheria.VtedyService.Models;

namespace Vetheria.VtedyService.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TagsController : Controller
    {
        private IQueryHandler<Task<IEnumerable<Tag>>> _tagQueryHandler;
        private ICommandHandler<Tag, Task<Result<int>>> _addTagCommandHandler;
        private ICommandHandler<int, Task<Result<int>>> _deleteTagCommandHandler;

        public TagsController(
            IQueryHandler<Task<IEnumerable<Tag>>> tagQueryHandler,
            ICommandHandler<Tag, Task<Result<int>>> addTagCommandHandler,
            ICommandHandler<int, Task<Result<int>>> deleteTagCommandHandler
            )
        {
            _tagQueryHandler = tagQueryHandler;
            _addTagCommandHandler = addTagCommandHandler;
            _deleteTagCommandHandler = deleteTagCommandHandler;
        }

        // GET: api/Tags
        [HttpGet]
        public async Task<IEnumerable<Tag>> GetTags()
        {
            return await _tagQueryHandler.Execute();
            //return _context.Tags;
        }

        // GET: api/Tags/5
        //[HttpGet("{id}")]
        //public async Task<IActionResult> GetTag([FromRoute] int id)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    var tag = await _context.Tags.SingleOrDefaultAsync(m => m.Id == id);

        //    if (tag == null)
        //    {
        //        return NotFound();
        //    }

        //    return Ok(tag);
        //}

        // PUT: api/Tags/5
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutTag([FromRoute] int id, [FromBody] Tag tag)
        //{
        //    if (!ModelState.IsValid)
        //    {
        //        return BadRequest(ModelState);
        //    }

        //    if (id != tag.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(tag).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!TagExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}

        // POST: api/Tags
        [HttpPost]
        public async Task<IActionResult> PostTag([FromBody] Tag tag)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            await _addTagCommandHandler.ExecuteAsync(tag);


            return CreatedAtAction("GetTags", new { id = tag.Id }, tag);
        }

        // DELETE: api/Tags/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag([FromRoute] int id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var res = await _deleteTagCommandHandler.ExecuteAsync(id);

            if (!res.IsSuccess)
            {
                return NotFound();
            }


            return Ok(res);
        }

        //private bool TagExists(int id)
        //{
        //    return _context.Tags.Any(e => e.Id == id);
        //}
    }
}