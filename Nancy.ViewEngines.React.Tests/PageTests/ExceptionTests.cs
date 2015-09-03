namespace Nancy.ViewEngines.React.Tests.PageTests
{
    using Pages;
    using Xunit;

    public class ExceptionTests : TestBase
    {
        public ExceptionTests(Fixture fixture)
            : base(fixture)
        {
        }

        [Fact]
        public void Throwing_exception_should_render_error_page()
        {
            var page = this.GoTo<ExceptionPage>();

            Assert.Equal("500 - InternalServerError", page.ErrorCaption);
            Assert.StartsWith("JavaScriptEngineSwitcher.Core.JsRuntimeException", page.ErrorDetails);
            Assert.Contains("An exception is thrown in JavaScript code", page.ErrorDetails);
        }
    }
}
