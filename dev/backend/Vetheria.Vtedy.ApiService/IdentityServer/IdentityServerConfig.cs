using IdentityServer4.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Test;
using Microsoft.Extensions.Configuration;

namespace Vetheria.Vtedy.ApiService.IdentityServer
{
    public class IdentityServerConfig
    {
        private const string ApiName = "AWR.Api";
        private const string ApiDisplayName = "Any Word Rotator API";
        private const string ApiSecret = "4124330e-f303-4290-983e-52feae4ffb8b";

        public IdentityServerConfig(IConfiguration config)
        {
            LoadOptions(config);
        }

        public string AuthorityUrl { get; private set; }

        public IEnumerable<IdentityResource> GetIdentityResources()
        {
            return new List<IdentityResource>
            {
                new IdentityResources.OpenId(),
                new IdentityResources.Profile(),
                new IdentityResources.Email(),
            };
        }

        public IEnumerable<ApiResource> GetApiResources()
        {
            return new List<ApiResource>
            {
                new ApiResource(ApiName, ApiDisplayName)
                {
                    ApiSecrets = { new Secret(ApiSecret.Sha256()) }
                }
            };
        }

        public IReadOnlyCollection<Client> Clients { get; private set; }


        private void LoadOptions(IConfiguration config)
        {
            var options = config.GetSection("IdentityServer").Get<IdentityServerOptions>();

            var clients = new List<Client>();
            foreach (var item in options.Clients)
            {
                var client = new Client
                {
                    ClientId = item.ClientId,
                    ClientSecrets = item.Secrets.Select(secret => new Secret(secret.Sha256())).ToList(),
                    AllowedGrantTypes = GrantTypes.ResourceOwnerPassword,
                    AllowedScopes = item.AllowedScopes,
                };
                clients.Add(client);
            }

            Clients = clients;

            AuthorityUrl = options.AuthorityUrl;
        }

    }
}
