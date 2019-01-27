using System;
using System.Collections.Generic;
using System.Text;

namespace Vetheria.Vtedy.Application.Core
{
    public class Result<TData> : Result
    {
        public TData Data { get; set; }

        public static Result<TData> CreateSuccess(TData data)
        {
            return new Result<TData> { Data = data, IsSuccess = true };
        }

        public static Result<TData> CreateFailure(TData data = default(TData), int errorCode = 0, string errorMessage = null)
        {
            return new Result<TData> { Data = data, IsSuccess = false, ErrorCode = errorCode, ErrorMessage = errorMessage };
        }

    }


    public class Result
    {
        public bool IsSuccess { get; set; } = true;
        public int ErrorCode { get; set; }
        public string ErrorMessage { get; set; }

        public static Result CreateFailure(int errorCode = 0, string errorMessage = null)
        {
            return new Result { IsSuccess = false, ErrorCode = errorCode, ErrorMessage = errorMessage };
        }

    }
}
