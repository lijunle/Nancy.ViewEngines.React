namespace Nancy.ViewEngines.React.UnitTests.ConfigurationTests
{
    using Xunit;

    public class ServerTest : TestBase
    {
        public ServerTest()
            : base("Server.config")
        {
        }

        [Fact]
        public void Server_configuration_should_load_properties()
        {
            Assert.Equal("assets-path", this.Configuration.Server.Assets.Path);
        }
    }
}
