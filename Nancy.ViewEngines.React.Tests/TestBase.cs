namespace Nancy.ViewEngines.React.Tests
{
    using System;
    using Common;
    using OpenQA.Selenium;
    using OpenQA.Selenium.Chrome;
    using Xunit;

    [Collection(FixtureCollection.Name)]
    public class TestBase : IDisposable
    {
        public TestBase()
        {
            this.Driver = new ChromeDriver();
        }

        protected IWebDriver Driver { get; }

        public void Dispose()
        {
            this.Driver.Quit();
        }

        [CollectionDefinition(Name)]
        public class FixtureCollection : ICollectionFixture<Host>
        {
            public const string Name = "host";
        }
    }
}
