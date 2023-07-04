using FitnessWebsite.Entities;
using FitnessWebsite.Dtos;
using FitnessWebsite.Interfaces;
using Microsoft.AspNetCore.Mvc;

namespace FitnessWebsite.Controllers
{
    [ApiController]
    [Route("api/authentication")]
    public class AuthenticationController : ControllerBase
    {
        private readonly IAuthService _authenticationService;
        private readonly ITokenService _tokenService;

        public AuthenticationController(IAuthService authenticationService, ITokenService tokenService)
        {
            _authenticationService = authenticationService;
            _tokenService = tokenService;
        }

        [HttpPost("register")]
        public async Task<IActionResult> RegisterUser(RegisterUserDto request)
        {
            await _authenticationService.RegisterAsync(request);
            return Ok(request);
        }

        [HttpPost("login")]
        public async Task<IActionResult> LoginUser(LoginUserDto request)
        {
            var response = await _authenticationService.LoginAsync(request);
            return Ok(response);
        }

        [HttpPost("refresh-token")]
        public async Task<IActionResult> RefreshToken(Token token)
        {
            var newToken = _tokenService.RefreshToken(token);
            return Ok(newToken);
        }

    }
}
