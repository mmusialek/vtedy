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
        private ITodoItemsCommentDataProvider _todoItemsCommentDataProvider;
        private IMapper _mapper;

        public TodoItemsController(ITodoItemDataProvider dataProvider, ITodoItemsCommentDataProvider todoItemsCommentDataProvider, IMapper mapper)
        {
            _dataProvider = dataProvider;
            _todoItemsCommentDataProvider = todoItemsCommentDataProvider;
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
            // TODO get user id from token
            var userId = 1;

            var todos = await _dataProvider.GetById(id, userId);
            var res = _mapper.Map<TodoItemDto>(todos);

            var resObj = new ObjectResult(res);
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
            // TODO get user id from token
            var userAccountId = 1;
            item.Id = id;
            var todo = _mapper.Map<TodoItem>(item);


            var addedItem = await _dataProvider.Update(todo);
            var res = _mapper.Map<TodoItemDto>(addedItem);

            var resObj = new ObjectResult(res);
            return resObj;
        }

        // DELETE: api/ApiWithActions/5
        [HttpDelete("{todoItemId}")]
        public async Task<IActionResult> DeleteAsync(string todoItemId)
        {
            // TODO get user id from token
            var userAccountId = 1;

            var addedItem = await _dataProvider.Delete(todoItemId, userAccountId);

            return new NoContentResult();
        }



        // comments



        // GET: api/Projects
        [HttpGet("{id}/comments")]
        public async Task<IActionResult> Get(string id)
        {
            var projectComments = await _todoItemsCommentDataProvider.Get(id);

            var res = _mapper.Map<List<TodoItemCommentDto>>(projectComments);

            var resObj = new ObjectResult(res);
            return resObj;
        }


        // GET: api/Projects
        [HttpPost("{id}/comments")]
        public async Task<IActionResult> AddComment(string id, [FromBody] TodoItemCommentRequestDto comment)
        {
            // TODO get user id from token
            var userId = 1;

            var item = _mapper.Map<TodoItemComment>(comment);
            item.UserAccountId = userId;
            item.TodoitemId = Guid.Parse(id);
            var projectComment = await _todoItemsCommentDataProvider.Add(item);
            var resDto = _mapper.Map<TodoItemCommentDto>(projectComment);

            var resObj = new ObjectResult(resDto);
            return resObj;
        }


        // GET: api/Projects
        [HttpPut("{id}/comments")]
        public async Task<IActionResult> PutComment(string id, [FromBody] TodoItemCommentRequestDto comment)
        {
            // TODO get user id from token            
            var userId = 1;

            // TODO: Validation - check if request.userAccountId match comment.userAccountId

            var item = _mapper.Map<TodoItemComment>(comment);
            item.UserAccountId = userId;
            item.TodoitemId = Guid.Parse(id);
            var projectComment = await _todoItemsCommentDataProvider.Update(item);
            var resDto = _mapper.Map<TodoItemCommentDto>(projectComment);

            var resObj = new ObjectResult(resDto);
            return resObj;
        }


        // tags


        [HttpGet("{todoItemId}/tags/{name?}")]
        public async Task<IActionResult> GetTodoItemTag(string todoItemId, string name)
        {
            var model = await _dataProvider.GetTag(todoItemId, name);
            var dto = _mapper.Map<IEnumerable<Tag>>(model);

            var resObj = new ObjectResult(dto);
            return resObj;
        }


        [HttpPost("{todoItemId}/tags")]
        public async Task<IActionResult> AddTodoItemTag(string todoItemId, [FromBody] TodoItemTagAddRequest tag)
        {
            TodoItemTagDto res = null;
            TodoItemTag model = null;

            try
            {
                if (string.IsNullOrEmpty(tag.TagName))
                {
                    model = await _dataProvider.AddTag(todoItemId, tag.TagId);
                }
                else
                {
                    model = await _dataProvider.AddTag(todoItemId, tag.TagName);
                }
            }
            catch (Exception ex)
            {
                Console.WriteLine(ex);
                throw;
            }

            res = _mapper.Map<TodoItemTagDto>(model);

            var resObj = new ObjectResult(res);
            return resObj;
        }

        [HttpDelete("{todoItemId}/tags/{todoItemTagId}")]
        public async Task<IActionResult> DeleteTodoItemTag(string todoItemId, int todoItemTagId)
        {
            var model = await _dataProvider.DeleteTag(todoItemId, todoItemTagId);

            var resObj = new ObjectResult(model);
            return resObj;
        }
    }
}
