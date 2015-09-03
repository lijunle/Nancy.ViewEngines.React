namespace Nancy.ViewEngines.React.Tests.Pages
{
    using OpenQA.Selenium;

    internal class ConsolePage : PageBase
    {
        internal string Text =>
            this.Driver.FindElement(By.TagName("body")).Text;

        protected override string Path => "console";
    }
}
