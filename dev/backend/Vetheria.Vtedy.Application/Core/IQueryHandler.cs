using System;
using System.Collections.Generic;
using System.Text;

namespace Vetheria.Vtedy.Application.Core
{
    public interface IQueryHandler<TInput, TResult>
    {
        TResult ExecuteAsync(TInput input);
    }


    public interface IQueryHandler<TResult>
    {
        TResult Execute();
    }
}
