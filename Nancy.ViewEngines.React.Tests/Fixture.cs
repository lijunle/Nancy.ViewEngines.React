namespace Nancy.ViewEngines.React.Tests
{
    using System;
    using Common;
    using OpenQA.Selenium;
    using OpenQA.Selenium.Chrome;

    public class Fixture : IDisposable
    {
        public Fixture()
        {
            this.Host = new Host();
            this.Driver = new ChromeDriver();
        }

        internal Host Host { get; }

        internal IWebDriver Driver { get; }

        public void Dispose()
        {
            this.Driver.Quit();
            this.Host.Dispose();
        }
    }
}
