namespace Nancy.ViewEngines.React.Tests
{
    using Pages;
    using Xunit;

    public class HomeTests : TestBase
    {
        public HomeTests(Fixture fixture)
            : base(fixture)
        {
        }

        [Fact]
        public void Home_page_should_render_fine()
        {
            HomePage page = this.GoTo<HomePage>();

            Assert.NotNull(page);

            Assert.Equal("Example Title", page.Title);
            Assert.Equal("Home: Hello world", page.Text);

            Assert.NotEmpty(page.RootElement.GetAttribute("data-reactid"));
            Assert.NotEmpty(page.RootElement.GetAttribute("data-react-checksum"));
        }
    }
}
