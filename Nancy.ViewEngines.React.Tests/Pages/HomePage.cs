namespace Nancy.ViewEngines.React.Tests.Pages
{
    using OpenQA.Selenium;

    internal class HomePage : PageBase
    {
        internal IWebElement RootElement =>
            this.Driver.FindElement(By.CssSelector("[data-react-checksum]"));

        internal string Text =>
            this.RootElement.Text;

        protected override string Path => string.Empty;
    }
}
