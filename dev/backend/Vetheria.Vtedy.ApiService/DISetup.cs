using Microsoft.Extensions.DependencyInjection;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Vetheria.Vtedy.Application.CommandHandlers.Tags;
using Vetheria.Vtedy.Application.CommandHandlers.TodoItems;
using Vetheria.Vtedy.Application.Core;
using Vetheria.Vtedy.Application.Handlers;
using Vetheria.Vtedy.Application.Handlers.Tags;
using Vetheria.Vtedy.Application.Handlers.TodoItems;
using Vetheria.Vtedy.DataAccess;
using Vetheria.Vtedy.DataModel.Model;

namespace Vetheria.Vtedy.ApiService
{
    public static class DiSetup
    {
        public static void SetupServicesToInject(this IServiceCollection services)
        {
            //add di items
            services.AddTransient<IDbContext, VtedyContext>();

            // tags
            services.AddTransient<IQueryHandler<Task<IEnumerable<Tag>>>, GetTagsQueryHandler>();
            services.AddTransient<ICommandHandler<Tag, Task<Result<int>>>, AddTagCommandHandler>();
            services.AddTransient<ICommandHandler<int, Task<Result<int>>>, DeleteTagCommandHandler>();


            // todo items
            services.AddTransient<IQueryHandler<Task<IEnumerable<TodoItem>>>, GetTodoItemsQueryHandler>();
            services.AddTransient<IQueryHandler<string, Task<TodoItem>>, GetTodoItemByIdQueryHandler>();
            services.AddTransient<ICommandHandler<string, Task<Result<string>>>, DeleteTodoItemCommandHandler>();
            services.AddTransient<ICommandHandler<TodoItem, Task<Result<string>>>, AddTodoItemCommandHandler>();
            //services.AddTransient<IDbContext, VtedyContext>();
        }
    }
}
