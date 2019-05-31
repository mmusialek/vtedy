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

            CreateMap<TodoItemDto, TodoItem>();
            CreateMap<TodoItemTagDto, TodoItemTag>();
            CreateMap<UserAccountDto, UserAccount>();

            CreateMap<ProjectCommentRequestDto, ProjectComment>();
            CreateMap<TodoItemCommentRequestDto, TodoItemComment>();
            CreateMap<ProjectCommentDto, ProjectComment>().ForAllMembers(p => p.AllowNull());
            CreateMap<TodoItemCommentDto, TodoItemComment>().ForAllMembers(p => p.AllowNull());
            CreateMap<CommentFilterDto, CommentFilter>();
        }
    }

}
