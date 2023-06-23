using FitnessWebsite.Entities;

namespace FitnessWebsite.Interfaces
{
    public interface ITokenService
    {
        Task<Token> GetTokenAsync(ApplicationUser user);
        Task<Token> RefreshToken(Token token);
    }
}
