using System.Collections.Generic;
using System.Linq;
using Vetheria.Vtedy.DataModel.Model;

namespace Vetheria.Vtedy.DataAccess
{
    public class MockData
    {
        public static void Run(VtedyContext context)
        {
            TodoItems(context);
        }

        private static void TodoItems(VtedyContext context)
        {
            if (!context.TodoItems.Any())
            {
                // NOTE temporary solution
                // NOTE generate some mocked data
                var tag1 = new Tag { Name = "allegro" };
                var tag2 = new Tag { Name = "disney" };
                //                tag1.TodoItems = new List<TodoItem>();
                //                tag2.TodoItems = new List<TodoItem>();
                context.Tags.Add(tag1);
                context.Tags.Add(tag2);
                context.SaveChanges();

                for (int i = 0; i < 5; i++)
                {

                    var todo = new TodoItem
                    {
                        Name = "Item_" + i
                    };

                    todo.TodoItemTags = new List<TodoItemTag> { new TodoItemTag { Tag = tag1, TodoItem = todo } };

                    //                    tag1.TodoItems = new List<TodoItem>();
                    //                    tag2.TodoItems = new List<TodoItem>();
                    //                    tag1.TodoItems.Add(todo);
                    //                    tag2.TodoItems.Add(todo);

                    context.TodoItems.Add(todo);
                }


                context.SaveChanges();
            }
        }
    }
}