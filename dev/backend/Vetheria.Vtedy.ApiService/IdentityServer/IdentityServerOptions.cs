using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Vetheria.Vtedy.ApiService.IdentityServer
{
    public class IdentityServerOptions
    {
        public string AuthorityUrl { get; set; }
        public IReadOnlyCollection<ClientOptions> Clients { get; set; }
    }
}
