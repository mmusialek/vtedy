using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Threading.Tasks;
using AutoMapper;
using IdentityServer4.AccessTokenValidation;
using IdentityServer4.Services;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Authentication.Cookies;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Mvc.Formatters;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Newtonsoft.Json;
using Swashbuckle.AspNetCore.Swagger;
using Vetheria.Vtedy.ApiService.DataAccess;
using Vetheria.Vtedy.ApiService.DataAccess.DataProviders;
using Vetheria.Vtedy.ApiService.DataAccess.Mappings;
using Vetheria.Vtedy.ApiService.DataAccess.Queries;
using Vetheria.Vtedy.ApiService.IdentityServer;
using Vetheria.Vtedy.ApiService.Models;
using Vetheria.Vtedy.Application.Core;

namespace Vetheria.Vtedy.ApiService
{
    public class Startup
    {
        private IdentityServerConfig _identityConfig;

        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
            _identityConfig = new IdentityServerConfig(configuration);
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddIdentityServer()
                .AddDeveloperSigningCredential()
                .AddInMemoryIdentityResources(_identityConfig.GetIdentityResources())
                .AddInMemoryApiResources(_identityConfig.GetApiResources())
                .AddInMemoryClients(_identityConfig.Clients)
                .AddProfileService<ProfileService>();

            services.AddAutoMapper();
            services.AddMvcCore(options =>
                {
                    //options.RespectBrowserAcceptHeader = true;
                    //var policy = new AuthorizationPolicyBuilder()
                    // .RequireAuthenticatedUser()
                    // .Build();
                    //options.Filters.Add(new AuthorizeFilter(policy));
                    //var policy = ScopePolicy.Create("api");
                    //options.Filters.Add(new AuthorizeFilter(policy));
                })
                //.SetCompatibilityVersion(Microsoft.AspNetCore.Mvc.CompatibilityVersion.Version_2_1)
                .AddAuthorization()
                .AddJsonFormatters()
                .AddJsonOptions(options =>
                    {
                        options.SerializerSettings.ReferenceLoopHandling = ReferenceLoopHandling.Ignore;
                    })
                .AddApiExplorer();

            services.AddSwaggerGen(c =>
            {
                c.SwaggerDoc("v1", new Info { Title = "Vtedy API", Version = "v1" });
            });

            MapRegister.Register();

            services.AddTransient<IConnectionFactory, ConnectionFactory>();
            services.AddTransient<IProjectDataProvider, ProjectDataProvider>();
            services.AddTransient<IUserAccountDataProvider, UserAccountDataProvider>();
            services.AddTransient<ITodoItemDataProvider, TodoItemDataProvider>();
            services.AddTransient<ITodoItemsCommentDataProvider, TodoItemsCommentDataProvider>();
            services.AddTransient<IProjectsCommentDataProvider, ProjectsCommentDataProvider>();
            services.AddTransient<ITodoItemsCommentDataProvider, TodoItemsCommentDataProvider>();

            // identityserver
            services.AddTransient<IResourceOwnerPasswordValidator, ResourceOwnerPasswordValidator>();
            services.AddTransient<IProfileService, ProfileService>();

            services.AddAuthentication(options =>
            {
                options.DefaultScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultSignInScheme = CookieAuthenticationDefaults.AuthenticationScheme;
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
            })
                .AddCookie(CookieAuthenticationDefaults.AuthenticationScheme)
                .AddIdentityServerAuthentication(JwtBearerDefaults.AuthenticationScheme, options =>
                {
                    options.SaveToken = true;
                    options.Authority = _identityConfig.AuthorityUrl;
                    options.RequireHttpsMetadata = false;
                    options.SupportedTokens = SupportedTokens.Jwt;
                });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }


            app.UseSwagger();
            app.UseSwaggerUI(c =>
            {
                c.SwaggerEndpoint("/swagger/v1/swagger.json", "Vtedy API V1");
            });


            // TODO add CORS configuration here
            // NOTE temporary solution for frontend development
            app.UseCors(
                options => options.AllowAnyOrigin().AllowAnyMethod().AllowAnyHeader()
            );


            app.UseIdentityServer();
            app.UseMvc();

        }
    }
}
