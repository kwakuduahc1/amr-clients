using AMR_Study.Context;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace AMR_Study.Controllers.Helpers
{
    public class AuthHelper(IList<Claim> claims, IAppFeatures app)
    {
        public string Key
        {
            get
            {
                var secretKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(app.Key));
                var signinCredentials = new SigningCredentials(secretKey, SecurityAlgorithms.HmacSha256);

                var tokeOptions = new JwtSecurityToken(
                    issuer: app.Issuer,
                    audience: app.Audience,
                    claims: claims,
                    expires: app.Expiry,
                    signingCredentials: signinCredentials
                );
                var tokenString = new JwtSecurityTokenHandler().WriteToken(tokeOptions);
                return tokenString;
            }
        }
    }
}
