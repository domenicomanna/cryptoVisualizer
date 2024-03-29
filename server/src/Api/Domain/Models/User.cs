namespace Api.Domain.Models;

public class User
{
    public int Id { get; set; }
    public string Email { get; set; } = string.Empty;
    public string Password { get; set; } = string.Empty;
    public FiatCurrencyType FiatCurrencyType { get; set; } = null!;
    public List<RefreshToken> RefreshTokens { get; set; } = new List<RefreshToken>();
}
