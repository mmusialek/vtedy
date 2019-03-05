using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Vetheria.Vtedy.ApiService.Dto;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.Converters
{
    public class ContractToModelConverter : Profile
    {
        public ContractToModelConverter()
        {
            CreateMap<Guid?, string>().ConvertUsing(g => g?.ToString());
            CreateMap<Guid, string>().ConvertUsing(g => g.ToString());


            CreateMap<TagDto, Tag>();
            CreateMap<ProjectDto, Project>();
            CreateMap<ToDoItemFilterDto, ToDoItemFilter>();

            CreateMap<TodoItemDto, TodoItem>()
                .ForMember(p => p.ProjectId, o => o.ResolveUsing<TodoItemToModelResolver>());
        }
    }

    public class TodoItemToModelResolver : IValueResolver<TodoItemDto, TodoItem, int>
    {
        public int Resolve(TodoItemDto source, TodoItem destination, int destMember, ResolutionContext context)
        {

            //if (source.Tags == null)
            //{
            //    return destMember;
            //}


            //foreach (var sourceTodoItemTag in source.Tags)
            //{
            //    var item = new TodoItemTag
            //    {
            //        TagId = sourceTodoItemTag.Id,
            //        TodoItemId = Guid.Parse(source.Id)
            //    };
            //    destMember.Add(item);
            //}


            return source.Project.Id;
//            throw new NotImplementedException();
        }
    }
}
