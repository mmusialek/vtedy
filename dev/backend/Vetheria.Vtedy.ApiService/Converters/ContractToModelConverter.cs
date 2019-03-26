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
            //CreateMap<string, Guid>().ConvertUsing(Guid.Parse);
            CreateMap<string, Guid?>().ConvertUsing(s => string.IsNullOrWhiteSpace(s) ? (Guid?)null : Guid.Parse(s));

            CreateMap<TagDto, Tag>();
            CreateMap<ProjectDto, Project>();
            CreateMap<ToDoItemFilterDto, ToDoItemFilter>();

            CreateMap<TodoItemDto, TodoItem>()
                .ForMember(p => p.ProjectId, o => o.ResolveUsing<TodoItemToModelResolver>());

            CreateMap<ProjectCommentRequestDto, ProjectComment>();
            CreateMap<ProjectCommentDto, ProjectComment>().ForAllMembers(p => p.AllowNull());
            CreateMap<TodoitemCommentDto, TodoItemComment>().ForAllMembers(p => p.AllowNull());
            CreateMap<CommentFilterDto, CommentFilter>();
        }
    }

    public class TodoItemToModelResolver : IValueResolver<TodoItemDto, TodoItem, int>
    {
        public int Resolve(TodoItemDto source, TodoItem destination, int destMember, ResolutionContext context)
        {
            return source.Project.Id;
        }
    }
}
