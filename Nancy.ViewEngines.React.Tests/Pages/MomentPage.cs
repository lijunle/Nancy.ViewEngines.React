namespace Nancy.ViewEngines.React.Tests.Pages
{
    using System;
    using OpenQA.Selenium;

    internal class MomentPage : PageBase
    {
        internal string Text =>
            this.Driver.FindElement(By.TagName("body")).Text;

        internal DateTime Time =>
            DateTime.Parse(this.TimeElement.Text);

        protected override string Path => "moment";

        private IWebElement TimeElement =>
            this.Driver.FindElement(By.TagName("code"));
    }
}
