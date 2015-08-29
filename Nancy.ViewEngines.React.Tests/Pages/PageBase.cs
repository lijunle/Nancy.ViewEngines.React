namespace Nancy.ViewEngines.React.Tests.Pages
{
    using System;
    using Common;
    using OpenQA.Selenium;

    internal abstract class PageBase
    {
        private WeakReference<IWebDriver> driverReference;

        internal string Url => $"{Host.Url}/{this.Path}";

        internal string Title => this.Driver.Title;

        internal IWebDriver Driver
        {
            get
            {
                IWebDriver driver;
                this.driverReference.TryGetTarget(out driver);
                return driver;
            }

            set
            {
                this.driverReference = new WeakReference<IWebDriver>(value);
            }
        }

        protected abstract string Path { get; }
    }
}
