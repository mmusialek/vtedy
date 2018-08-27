using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Vetheria.Vtedy.ApiService.Dto;
using Vetheria.Vtedy.DataModel.Model;

namespace Vetheria.Vtedy.ApiService.Converters
{
    public class ContractConverter : Profile
    {
        public ContractConverter()
        {
            CreateMap<string, Guid>().ConvertUsing(Guid.Parse);
            CreateMap<string, Guid?>().ConvertUsing(s => string.IsNullOrWhiteSpace(s) ? (Guid?)null : Guid.Parse(s));
            CreateMap<Guid?, string>().ConvertUsing(g => g?.ToString("N"));
            CreateMap<Guid, string>().ConvertUsing(g => g.ToString("N"));

            CreateMap<Tag, TagDto>();
            CreateMap<Project, ProjectDto>();

            //            CreateMap<TodoItem, TodoItemDto>().ForMember(p=>p.Tags, o => o.MapFrom(i => i.TodoItemTags));
            CreateMap<TodoItem, TodoItemDto>().ForMember(p => p.Tags, o => o.ResolveUsing<TodoItemResolver>());
        }
    }

    public class TodoItemResolver : IValueResolver<TodoItem, TodoItemDto, List<TagDto>>
    {
        public List<TagDto> Resolve(TodoItem source, TodoItemDto destination, List<TagDto> destMember, ResolutionContext context)
        {
            if (source.TodoItemTags == null)
            {
                return destMember;
            }

            foreach (var sourceTodoItemTag in source.TodoItemTags)
            {
                TagDto item = new TagDto
                {
                    Id = sourceTodoItemTag.Tag.Id,
                    Name = sourceTodoItemTag.Tag.Name
                };
                destMember.Add(item);
            }


            return destMember;
        }
    }
}
