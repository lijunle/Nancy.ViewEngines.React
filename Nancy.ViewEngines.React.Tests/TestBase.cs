namespace Nancy.ViewEngines.React.Tests
{
    using Pages;
    using Xunit;

    [Collection(FixtureCollection.Name)]
    public class TestBase
    {
        private readonly Fixture fixture;

        public TestBase(Fixture fixture)
        {
            this.fixture = fixture;
        }

        internal TPage GoTo<TPage>()
            where TPage : PageBase, new()
        {
            var page = new TPage()
            {
                Driver = this.fixture.Driver
            };

            this.fixture.Driver.Url = page.Url;

            return page;
        }

        [CollectionDefinition(Name)]
        public class FixtureCollection : ICollectionFixture<Fixture>
        {
            public const string Name = "fixture";
        }
    }
}
