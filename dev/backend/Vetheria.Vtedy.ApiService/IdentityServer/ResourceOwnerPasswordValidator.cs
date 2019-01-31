using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Claims;
using System.Threading.Tasks;
using IdentityModel;
using IdentityServer4.Models;
using IdentityServer4.Validation;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Vetheria.Vtedy.ApiService.DataAccess.Queries;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.IdentityServer
{
    public class ResourceOwnerPasswordValidator : IResourceOwnerPasswordValidator
    {
        private IDataProvider<UserAccount> _userDataProvider;

        public ResourceOwnerPasswordValidator(IDataProvider<UserAccount> userDataProvider)
        {
            _userDataProvider = userDataProvider;
        }

        public async Task ValidateAsync(ResourceOwnerPasswordValidationContext context)
        {
            try
            {
                //get your user model from db (by username - in my case its email)
                //var user = await _userDataProvider.FindAsync(context.UserName);
                var user = new UserAccount { Id = 1, Email = "bob@gmail.com", Password = "bob", UserName = "bob" };

                if (user != null)
                {
                    //check if password match - remember to hash password if stored as hash in db
                    if (user.Password == context.Password)
                    {
                        //set the result
                        context.Result = new GrantValidationResult(
                            subject: user.Id.ToString(),
                            authenticationMethod: "custom",
                            claims: GetUserClaims());

                        return;
                    }

                    context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "Incorrect password");
                    return;
                }
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "User does not exist.");
            }
            catch (Exception ex)
            {
                context.Result = new GrantValidationResult(TokenRequestErrors.InvalidGrant, "Invalid username or password");
            }
        }

        internal static Claim[] GetUserClaims()
        {
            return new Claim[]
            {
                new Claim("user_id", "1"),
                new Claim(JwtClaimTypes.Name, "bob")
            };
        }
    }
}
