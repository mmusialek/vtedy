using System;
using System.Collections.Generic;
using System.Text;

namespace Vetheria.Vtedy.Application.Core
{
    public interface IQueryHandler<in TInput, out TResult>
    {
        TResult ExecuteAsync(TInput input);
    }


    public interface IQueryHandler<out TResult>
    {
        TResult Execute();
    }
}
