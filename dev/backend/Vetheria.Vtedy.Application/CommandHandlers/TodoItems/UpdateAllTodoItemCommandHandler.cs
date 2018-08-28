using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using Vetheria.Vtedy.Application.Core;
using Vetheria.Vtedy.DataAccess;
using Vetheria.Vtedy.DataModel.Model;

namespace Vetheria.Vtedy.Application.CommandHandlers.TodoItems
{
    public class UpdateAllTodoItemCommandHandler : HandlerBase, ICommandHandler<TodoItem, Task<TodoItem>>
    {
        public UpdateAllTodoItemCommandHandler(IDbContext context) : base(context)
        {
        }

        public async Task<TodoItem> ExecuteAsync(TodoItem input)
        {
            TodoItem res = null;
            var item = _context.TodoItems.Include(p=>p.Project).Include(p=>p.TodoItemTags).ThenInclude(p=>p.Tag).FirstOrDefault(p => p.Id == input.Id);


            if (item != null)
            {
                item.Name = input.Name;
                item.IsCompleted = input.IsCompleted;


                // update project data
                item.Project.Name = input.Project.Name;
                item.Project.Description = input.Project.Description;

                // update tags data
                var tagIds = input.TodoItemTags.Select(p => p.TagId).ToList();

                // remove tags which don't exist in TodoItem anymore
                var todoItemTags = item.TodoItemTags.Where(p => !tagIds.Contains(p.TagId));
                foreach (var todoItemTag in todoItemTags)
                {
                    item.TodoItemTags.Remove(todoItemTag);
                }

                // add tags which are new (available in input but no in item db)
                var itemTagsIds = item.TodoItemTags.Where(p => p.TodoItemId == item.Id).Select(p => p.TagId).ToList();
                var tagsToAdd = input.TodoItemTags.Where(p => !itemTagsIds.Contains(p.TagId));


                foreach (TodoItemTag tagToAdd in tagsToAdd)
                {
                    var todoItemTag = new TodoItemTag
                    {
                        TagId = tagToAdd.TagId,
                        TodoItemId = input.Id
                    };

                    item.TodoItemTags.Add(todoItemTag);
                }


                await _context.SaveChangesAsync();
                return await Task.FromResult(item);

                //                foreach (var itemTodoItemTag in item.TodoItemTags)
                //                {
                //                    var inputTag = input.TodoItemTags.FirstOrDefault(p => p.TagId == itemTodoItemTag.TagId && p.TodoItemId == itemTodoItemTag.TodoItemId);
                //                    if (inputTag != null)
                //                    {
                //                        itemTodoItemTag.Tag.
                //                    }
                //                }
            }


            res = input;
            return await Task.FromResult(res);
        }
    }
}
