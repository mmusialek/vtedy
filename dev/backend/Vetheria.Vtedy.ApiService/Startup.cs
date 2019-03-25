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
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
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
using Vetheria.Vtedy.ApiService.DataAccess.Queries;
using Vetheria.Vtedy.ApiService.IdentityServer;
using Vetheria.Vtedy.ApiService.Models;
using Vetheria.Vtedy.Application.Core;

namespace Vetheria.Vtedy.ApiService
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddIdentityServer()
                .AddDeveloperSigningCredential()
                .AddInMemoryIdentityResources(IdentityServerConfig.GetIdentityResources())
                .AddInMemoryApiResources(IdentityServerConfig.GetApis())
                .AddInMemoryClients(IdentityServerConfig.GetClients())
                .AddProfileService<ProfileService>();
            //.AddTestUsers(IdentityServerConfig.GetUsers());

            services.AddAutoMapper();
            services.AddMvcCore(options =>
                {
                    options.RespectBrowserAcceptHeader = true; // false by default
                })
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

            services.AddTransient<IConnectionFactory, ConnectionFactory>();
            services.AddTransient<IProjectDataProvider, ProjectDataProvider>();
            services.AddTransient<IUserAccountDataProvider, UserAccountDataProvider>();
            services.AddTransient<ITodoItemDataProvider, TodoItemDataProvider>();
            services.AddTransient<ICommentDataProvider, CommentDataProvider>();

            // identityserver
            services.AddTransient<IResourceOwnerPasswordValidator, ResourceOwnerPasswordValidator>();
            services.AddTransient<IProfileService, ProfileService>();

            services.AddAuthentication()
                .AddIdentityServerAuthentication(options =>
                {
                    options.SaveToken = true;
                    options.Authority = "http://localhost:5001";
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
