namespace Nancy.ViewEngines.React.Tests.Pages
{
    using OpenQA.Selenium;

    internal class CsrfPage : PageBase
    {
        internal IWebElement InputBox =>
            this.Driver.FindElement(By.CssSelector("input[type=text]"));

        internal IWebElement SubmitButton =>
            this.Driver.FindElement(By.CssSelector("input[type=submit]"));

        internal IWebElement CsrfElement =>
            this.Driver.FindElement(By.CssSelector("input[type=hidden]"));

        internal string Label =>
            this.Driver.FindElement(By.CssSelector("form > div")).Text;

        internal string ErrorCaption =>
            this.Driver.FindElement(By.CssSelector("#errorText > h1")).Text;

        internal string ErrorDetails =>
            this.Driver.FindElement(By.Id("errorContents")).Text;

        protected override string Path => "csrf";

        internal void SetCsrf(string value) =>
            this.JavaScriptExecutor.ExecuteScript($"document.querySelector('input[type=hidden]').setAttribute('value', '{value}')");
    }
}
