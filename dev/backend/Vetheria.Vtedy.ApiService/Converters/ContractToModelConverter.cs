using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Vetheria.Vtedy.ApiService.Dto;
using Vetheria.Vtedy.DataModel.Model;

namespace Vetheria.Vtedy.ApiService.Converters
{
    public class ContractToModelConverter : Profile
    {
        public ContractToModelConverter()
        {
            CreateMap<Guid?, string>().ConvertUsing(g => g?.ToString("N"));
            CreateMap<Guid, string>().ConvertUsing(g => g.ToString("N"));


            CreateMap<TagDto, Tag>();
            CreateMap<ProjectDto, Project>();


            //CreateMap<TodoItemDto, TodoItem>().ForMember(p => p.TodoItemTags, o => o.ResolveUsing<TodoItemToModelResolver>());
        }
    }

    public class TodoItemToModelResolver : IValueResolver<TodoItemDto, TodoItem, ICollection<TodoItemTag>>
    {
        public ICollection<TodoItemTag> Resolve(TodoItemDto source, TodoItem destination, ICollection<TodoItemTag> destMember, ResolutionContext context)
        {

            if (source.Tags == null)
            {
                return destMember;
            }


            foreach (var sourceTodoItemTag in source.Tags)
            {
                var item = new TodoItemTag
                {
                    TagId = sourceTodoItemTag.Id,
                    TodoItemId = Guid.Parse(source.Id)
                };
                destMember.Add(item);
            }


            return destMember;

//            throw new NotImplementedException();
        }
    }
}
