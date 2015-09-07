namespace Nancy.ViewEngines.React.UnitTests.ConfigurationTests
{
    using Xunit;

    public class DefaultTest : TestBase
    {
        public DefaultTest()
            : base("Default.config")
        {
        }

        [Fact]
        public void Default_configuration_should_set_up_script_properties()
        {
            Assert.Equal("client", this.Configuration.Script.Dir);
            Assert.Equal("script.js", this.Configuration.Script.Name);
            Assert.Empty(this.Configuration.Script.Extensions);
        }

        [Fact]
        public void Default_configuration_should_set_up_server_assets_path()
        {
            Assert.Equal("assets", this.Configuration.Server.Assets.Path);
        }

        [Fact]
        public void Default_extension_should_be_right_value()
        {
            var defaultExtension = ReactConfiguration.ExtensionElement.DefaultValue;

            Assert.Equal("jsx", defaultExtension.Name);
        }
    }
}
