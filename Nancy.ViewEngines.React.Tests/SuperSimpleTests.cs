namespace Nancy.ViewEngines.React.Tests
{
    using Pages;
    using Xunit;

    public class SuperSimpleTests : TestBase
    {
        public SuperSimpleTests(Fixture fixture)
            : base(fixture)
        {
        }

        [Fact]
        public void Super_simple_view_engine_should_render_fine()
        {
            var page = this.GoTo<SuperSimplePage>();

            Assert.Contains("React view engine", page.Content);
            Assert.Contains("Super Simple view engine", page.Content);
        }
    }
}
