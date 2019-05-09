using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vetheria.Vtedy.ApiService.IdentityServer
{
    public class ClientOptions
    {
        public string ClientId { get; set; }
        public IReadOnlyCollection<string> Secrets { get; set; }
        public ICollection<string> AllowedScopes { get; set; }
    }
}
