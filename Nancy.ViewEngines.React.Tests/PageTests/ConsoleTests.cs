namespace Nancy.ViewEngines.React.Tests.PageTests
{
    using Pages;
    using Xunit;

    public class ConsoleTests : TestBase
    {
        public ConsoleTests(Fixture fixture)
            : base(fixture)
        {
        }

        [Fact]
        public void Console_page_should_render_fine()
        {
            var page = this.GoTo<ConsolePage>();

            // TODO find a way to assert on the console output
            Assert.Equal("Open developer tool to check console output.", page.Text);
        }
    }
}
