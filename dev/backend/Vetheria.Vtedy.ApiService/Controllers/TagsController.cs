using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Vetheria.Vtedy.ApiService.Models;
using Vetheria.Vtedy.Application.Core;

namespace Vetheria.Vtedy.ApiService.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class TagsController : ControllerBase
    {
        public TagsController()
        {
        }

        // GET: api/Tags
        [HttpGet]
        public async Task<IActionResult> GetTags()
        {
            var resObj = new ObjectResult(null);
            return resObj;
        }


        //POST: api/Tags
        [HttpPost]
        public async Task<IActionResult> PostTag([FromBody] Tag tag)
        {
            var resObj = new ObjectResult(null);
            return resObj;
        }

        // DELETE: api/Tags/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTag([FromRoute] int id)
        {
            var resObj = new ObjectResult(null);
            return resObj;
        }


    }
}