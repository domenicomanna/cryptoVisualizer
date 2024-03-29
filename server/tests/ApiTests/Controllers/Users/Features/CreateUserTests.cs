using Api.Common.Exceptions;
using Api.Controllers.Users;
using Api.Controllers.Users.Common.Features;
using Api.Database;
using Api.Domain.Models;
using Api.Utils;
using AutoMapper;
using FluentValidation.TestHelper;
using Moq;

namespace ApiTests.Controllers.Users.Features;

[TestClass]
public class CreateUserTests
{
    IMapper _mapper = null!;
    AppDbContextCreator _appDbContextCreator = null!;
    Mock<IPasswordHasher> _passwordHasherMock = null!;
    Mock<IJwtHelper> _jwtHelperMock = null!;

    [TestInitialize]
    public void SetUp()
    {
        MapperConfiguration mapperConfiguration = new MapperConfiguration(opts =>
        {
            opts.AddProfile(new UsersMappingProfile());
        });
        _mapper = mapperConfiguration.CreateMapper();

        _appDbContextCreator = new AppDbContextCreator();
        _passwordHasherMock = new Mock<IPasswordHasher>();
        _jwtHelperMock = new Mock<IJwtHelper>();
    }

    [TestMethod]
    public void ThereShouldBeAValidationErrorIfTheCurrencyIsInvalid()
    {
        CreateUserRequestValidator validator = new CreateUserRequestValidator();
        CreateUserRequest request = new CreateUserRequest
        {
            Email = "test@gmail.com",
            Password = "test12345",
            ConfirmedPassword = "test12345",
            FiatCurrencyType = "xyz123"
        };
        var result = validator.TestValidate(request);
        result.ShouldHaveValidationErrorFor(x => x.FiatCurrencyType);
    }

    [TestMethod]
    public async Task AnExceptionShouldBeThrownIfTheEmailIsTaken()
    {
        AppDbContext appDbContext = _appDbContextCreator.CreateContext();
        User user = new User { Email = "test@gmail.com", FiatCurrencyType = appDbContext.FiatCurrencyTypes.First() };
        appDbContext.Users.Add(user);
        appDbContext.SaveChanges();

        CreateUserHandler handler = new CreateUserHandler(
            _passwordHasherMock.Object,
            _mapper,
            _jwtHelperMock.Object,
            appDbContext
        );
        CreateUserRequest request = new CreateUserRequest
        {
            Email = user.Email,
            Password = "12345",
            ConfirmedPassword = "12345",
            FiatCurrencyType = "USD"
        };

        await Assert.ThrowsExceptionAsync<ApiException>(async () => await handler.Handle(request));
    }

    [TestMethod]
    public async Task TheUserShouldBeCreatedSuccessfully()
    {
        AppDbContext appDbContext = _appDbContextCreator.CreateContext();

        _jwtHelperMock.Setup(x => x.CreateAccessToken(It.IsAny<User>())).Returns("token");
        _jwtHelperMock
            .Setup(x => x.CreateRefreshToken(It.IsAny<User>()))
            .Returns((User user) => (new RefreshToken { UserId = user.Id }, "refreshToken"));

        _passwordHasherMock.Setup(x => x.HashPassword(It.IsAny<string>())).Returns("test");

        CreateUserHandler handler = new CreateUserHandler(
            _passwordHasherMock.Object,
            _mapper,
            _jwtHelperMock.Object,
            appDbContext
        );
        CreateUserRequest request = new CreateUserRequest
        {
            Email = "test@gmail.com",
            Password = "test12345",
            ConfirmedPassword = "test12345",
            FiatCurrencyType = "USD"
        };

        (CreateUserResult result, string nonHashedRefreshToken) = await handler.Handle(request);
        Assert.AreEqual(request.Email, result.User.Email);
    }
}
