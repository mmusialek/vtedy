using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IdentityServer4.Models;
using IdentityServer4.Services;
using Vetheria.Vtedy.ApiService.DataAccess.Queries;
using Vetheria.Vtedy.ApiService.Models;

namespace Vetheria.Vtedy.ApiService.IdentityServer
{
    public class ProfileService : IProfileService
    {
        private IDataProvider<UserAccount> _userDataProvider;

        public ProfileService(IDataProvider<UserAccount> userDataProvider)
        {
            _userDataProvider = userDataProvider;
        }

        public Task GetProfileDataAsync(ProfileDataRequestContext context)
        {
            try
            {
                //depending on the scope accessing the user data.
                if (!string.IsNullOrEmpty(context.Subject.Identity.Name))
                {
                    //get user from db (in my case this is by email)
                    //var user = await _userRepository.FindAsync(context.Subject.Identity.Name);
                    var user = new UserAccount { Id = 1, Email = "bob@gmail.com", Password = "bob", UserName = "bob" };

                    if (user != null)
                    {
                        var claims = ResourceOwnerPasswordValidator.GetUserClaims();

                        //set issued claims to return
                        context.IssuedClaims = claims.Where(x => context.RequestedClaimTypes.Contains(x.Type)).ToList();
                    }
                }
                else
                {
                    //get subject from context (this was set ResourceOwnerPasswordValidator.ValidateAsync),
                    //where and subject was set to my user id.
                    var userId = context.Subject.Claims.FirstOrDefault(x => x.Type == "sub");

                    if (!string.IsNullOrEmpty(userId?.Value) && long.Parse(userId.Value) > 0)
                    {
                        //get user from db (find user by user id)
                        //var user = await _userRepository.FindAsync(long.Parse(userId.Value));
                        var user = new UserAccount { Id = 1, Email = "bob@gmail.com", Password = "bob", UserName = "bob" };

                        // issue the claims for the user
                        if (user != null)
                        {
                            var claims = ResourceOwnerPasswordValidator.GetUserClaims();

                            context.IssuedClaims = claims.Where(x => context.RequestedClaimTypes.Contains(x.Type)).ToList();
                        }
                    }
                }
            }
            catch (Exception ex)
            {
                //log your error
            }

            return Task.FromResult(1);
        }

        public Task IsActiveAsync(IsActiveContext context)
        {
            return Task.FromResult(1);
        }
    }
}
