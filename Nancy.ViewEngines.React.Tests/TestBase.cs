namespace Nancy.ViewEngines.React.Tests
{
    using System;
    using Common;
    using OpenQA.Selenium;
    using OpenQA.Selenium.Chrome;
    using Pages;
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

        internal TPage GoTo<TPage>()
            where TPage : PageBase, new()
        {
            var page = new TPage()
            {
                Driver = this.Driver
            };

            this.Driver.Url = page.Url;

            return page;
        }

        [CollectionDefinition(Name)]
        public class FixtureCollection : ICollectionFixture<Host>
        {
            public const string Name = "host";
        }
    }
}
