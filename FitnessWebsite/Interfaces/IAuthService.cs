using FitnessWebsite.Dtos;

namespace FitnessWebsite.Interfaces
{
    public interface IAuthService
    {
        Task RegisterAsync(RegisterUserDto registerUserDto);
        Task<SuccessfulLoginDto> LoginAsync(LoginUserDto loginUserDto);
    }
}
