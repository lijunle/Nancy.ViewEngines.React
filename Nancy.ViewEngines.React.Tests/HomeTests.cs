namespace Nancy.ViewEngines.React.Tests
{
    using Common;
    using Xunit;

    public class HomeTests : TestBase
    {
        [Fact]
        public void Home_page_should_render_fine()
        {
            this.Driver.Url = Host.Url;

            Assert.NotNull(this.Driver.Title);
            Assert.NotEmpty(this.Driver.Title);
        }
    }
}
