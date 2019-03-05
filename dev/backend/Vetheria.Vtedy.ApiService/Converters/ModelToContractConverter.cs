using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Vetheria.Vtedy.ApiService.Dto;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.Converters
{
    public class ModelToContractConverter : Profile
    {
        public ModelToContractConverter()
        {
            CreateMap<string, Guid>().ConvertUsing(Guid.Parse);
            CreateMap<string, Guid?>().ConvertUsing(s => string.IsNullOrWhiteSpace(s) ? (Guid?)null : Guid.Parse(s));

            CreateMap<Tag, TagDto>();
            CreateMap<Project, ProjectDto>();
            CreateMap<ToDoItemFilter, ToDoItemFilterDto>();

            CreateMap<TodoItem, TodoItemDto>().ForMember(p => p.Project, o => o.ResolveUsing<TodoItemToContractResolver>());
        }
    }

    public class TodoItemToContractResolver : IValueResolver<TodoItem, TodoItemDto, ProjectDto>
    {
        public ProjectDto Resolve(TodoItem source, TodoItemDto destination, ProjectDto destMember, ResolutionContext context)
        {
            //if (source.== null)
            //{
            //    return destMember;
            //}

            //foreach (var sourceTodoItemTag in source.TodoItemTags)
            //{
            //    TagDto item = new TagDto
            //    {
            //        Id = sourceTodoItemTag.Tag.Id,
            //        Name = sourceTodoItemTag.Tag.Name
            //    };
            //    destMember.Add(item);
            //}

            destination.Project = new ProjectDto
            {
                Id = source.ProjectId
            };


            return destMember;
        }
    }
}
