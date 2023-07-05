using FitnessWebsite.Entities;
using FitnessWebsite.Interfaces;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;

namespace FitnessWebsite.Services
{
    public class TokenService : ITokenService
    {
        private readonly IConfiguration _configuration;
        private readonly UserManager<ApplicationUser> _userManager;

        public TokenService(IConfiguration configuration, UserManager<ApplicationUser> userManager)
        {
            _configuration = configuration;
            _userManager = userManager;
        }   

        public async Task<Token> GetTokenAsync(ApplicationUser user)
        {
            var roles = await _userManager.GetRolesAsync(user);

            var claims = new List<Claim>()
            {
                new Claim("userId", user.Id),
                new Claim(ClaimTypes.Email, user.Email),
                new Claim(ClaimTypes.Role, roles.SingleOrDefault()),
                new Claim(JwtRegisteredClaimNames.Jti, Guid.NewGuid().ToString())
            };

            var tokenKey = Encoding.UTF8.GetBytes(_configuration["JWT:Key"]);

            var securityToken = new JwtSecurityToken(
                expires: DateTime.UtcNow.AddHours(1),
                claims: claims,
                signingCredentials: new SigningCredentials(new SymmetricSecurityKey(tokenKey), SecurityAlgorithms.HmacSha256Signature)
                );

            var token = new JwtSecurityTokenHandler().WriteToken(securityToken);

            user.RefreshToken = GenerateRefreshToken();
            user.RefreshTokenExpiryTime = DateTime.UtcNow.AddDays(int.Parse(_configuration["JWT:RefreshTokenValidityInDays"]));

            await _userManager.UpdateAsync(user);
            return new Token { AccessToken = token, RefreshToken = user.RefreshToken };

        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[64];
            using var randomNumberGenerator = RandomNumberGenerator.Create();
            randomNumberGenerator.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        public async Task<Token> RefreshToken(Token token)
        {
            var principal = GetPrincipalFromExpiredToken(token.AccessToken);

            var user = await _userManager.FindByEmailAsync(principal.FindFirstValue(ClaimTypes.Email));

            if (user == null || user.RefreshToken.TrimEnd('=') != token.RefreshToken || user.RefreshTokenExpiryTime <= DateTime.Now)
            {
                throw new SecurityTokenException("Invalid token");
            }

            var newToken = await GetTokenAsync(user);

            return new Token { AccessToken = newToken.AccessToken, RefreshToken = newToken.RefreshToken };
        }

        private ClaimsPrincipal? GetPrincipalFromExpiredToken(string? token)
        {
            var tokenValidationParameters = new TokenValidationParameters
            {
                ValidateAudience = false,
                ValidateIssuer = false,
                ValidateIssuerSigningKey = true,
                IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["JWT:Key"])),
                ValidateLifetime = false
            };

            var tokenHandler = new JwtSecurityTokenHandler();
            var principal = tokenHandler.ValidateToken(token, tokenValidationParameters, out SecurityToken securityToken);

            var jwtSecurityToken = securityToken as JwtSecurityToken;

            if (jwtSecurityToken == null)
            {
                throw new SecurityTokenException("Invalid token");
            }

            return principal;
        }
    }
}
