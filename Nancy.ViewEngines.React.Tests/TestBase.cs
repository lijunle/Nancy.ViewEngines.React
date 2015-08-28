namespace Nancy.ViewEngines.React.Tests
{
    using Common;
    using Xunit;

    [Collection(FixtureCollection.Name)]
    public class TestBase
    {
        [CollectionDefinition(Name)]
        public class FixtureCollection : ICollectionFixture<Host>
        {
            public const string Name = "host";
        }
    }
}
