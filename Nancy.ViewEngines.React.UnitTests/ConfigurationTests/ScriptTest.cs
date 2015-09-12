namespace Nancy.ViewEngines.React.UnitTests.ConfigurationTests
{
    using System.Linq;
    using Xunit;

    public class ScriptTest : TestBase
    {
        public ScriptTest()
            : base("Script.config")
        {
        }

        [Fact]
        public void Script_configuration_should_load_properties()
        {
            Assert.Equal("script-dir", this.Configuration.Script.Dir);
            Assert.Equal("script-name.js", this.Configuration.Script.Name);
            Assert.Equal(2, this.Configuration.Script.Extensions.Count);
            Assert.Equal("layout-name.jsx", this.Configuration.Script.Layout.Name);
        }

        [Fact]
        public void Script_configuration_should_load_extensions()
        {
            var extensions = this.Configuration.Script.Extensions
                .Cast<ReactConfiguration.ExtensionElement>()
                .Select(x => x.Name);

            Assert.Contains("es", extensions);
            Assert.Contains("jsx", extensions);
        }
    }
}
