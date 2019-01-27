using System;
using System.Collections.Generic;
using System.Text;

namespace Vetheria.Vtedy.Application.Core
{

    public interface ICommandHandler<TInput, TResult>
    {
        TResult ExecuteAsync(TInput input);
    }
}
