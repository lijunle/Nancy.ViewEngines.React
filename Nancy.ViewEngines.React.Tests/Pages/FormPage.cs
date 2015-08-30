namespace Nancy.ViewEngines.React.Tests.Pages
{
    using OpenQA.Selenium;

    internal class FormPage : PageBase
    {
        internal IWebElement InputBox =>
            this.Driver.FindElement(By.CssSelector("input[type=text]"));

        internal IWebElement SubmitButton =>
            this.Driver.FindElement(By.CssSelector("input[type=submit]"));

        protected override string Path => "form";
    }
}
