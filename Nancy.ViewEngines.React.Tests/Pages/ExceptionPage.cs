namespace Nancy.ViewEngines.React.Tests.Pages
{
    using OpenQA.Selenium;

    internal class ExceptionPage : PageBase
    {
        internal string ErrorCaption =>
            this.Driver.FindElement(By.CssSelector("#errorText > h1")).Text;

        internal string ErrorDetails =>
            this.Driver.FindElement(By.Id("errorContents")).Text;

        protected override string Path => "exception";
    }
}
