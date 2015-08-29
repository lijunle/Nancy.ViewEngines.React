namespace Nancy.ViewEngines.React.Tests.Pages
{
    using OpenQA.Selenium;

    internal class TitlePage : PageBase
    {
        internal IWebElement TitleBox =>
            this.Driver.FindElement(By.CssSelector("input[type=text]"));

        internal IWebElement UpdateButton =>
            this.Driver.FindElement(By.CssSelector("input[type=button]"));

        protected override string Path => "title";
    }
}
