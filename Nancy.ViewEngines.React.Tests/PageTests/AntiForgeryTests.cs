namespace Nancy.ViewEngines.React.Tests.PageTests
{
    using Pages;
    using Xunit;

    public class AntiForgeryTests : TestBase
    {
        private readonly AntiForgeryPage page;

        public AntiForgeryTests(Fixture fixture)
            : base(fixture)
        {
            StaticConfiguration.DisableErrorTraces = false;

            this.page = this.GoTo<AntiForgeryPage>();
        }

        [Fact]
        public void CSRF_page_should_render_form_and_hidden_input_box()
        {
            Assert.NotNull(this.page.InputBox);
            Assert.Equal("title", this.page.InputBox.GetAttribute("name"));
            Assert.Equal(string.Empty, this.page.InputBox.GetAttribute("value"));

            Assert.NotNull(this.page.SubmitButton);
            Assert.Equal("Submit", this.page.SubmitButton.GetAttribute("value"));

            Assert.NotNull(this.page.CsrfElement);
            Assert.NotEmpty(this.page.CsrfElement.GetAttribute("name"));
            Assert.NotEmpty(this.page.CsrfElement.GetAttribute("value"));

            Assert.NotNull(this.page.Label);
            Assert.Equal(string.Empty, this.page.Label);
        }

        [Fact]
        public void Post_with_valid_CSRF_token_should_work_fine()
        {
            var something = "something";

            this.page.InputBox.SendKeys(something);
            this.page.SubmitButton.Click();
            this.page.WaitUntil(driver => driver.Title == something);

            Assert.Equal(something, this.page.Label);

            Assert.NotNull(this.page.InputBox);
            Assert.NotNull(this.page.SubmitButton);
            Assert.NotNull(this.page.CsrfElement);
        }

        [Fact]
        public void Post_with_invalid_CSRF_token_should_not_pass_validation()
        {
            this.page.SetCsrf("INVALID_ANTI_FORGERY_TOKEN");
            this.page.InputBox.SendKeys("anything");
            this.page.SubmitButton.Click();
            this.page.WaitUntil(driver => driver.Title == "500");

            Assert.Equal("500 - InternalServerError", this.page.ErrorCaption);
            Assert.StartsWith("Nancy.RequestExecutionException", this.page.ErrorDetails);
            Assert.Contains("Nancy.Security.CsrfValidationException", this.page.ErrorDetails);
        }
    }
}
