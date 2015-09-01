namespace Nancy.ViewEngines.React.Tests.Pages
{
    using OpenQA.Selenium;

    internal class SuperSimplePage : PageBase
    {
        internal string Content =>
            this.Driver.FindElement(By.TagName("body")).Text;

        protected override string Path => "super-simple";
    }
}
