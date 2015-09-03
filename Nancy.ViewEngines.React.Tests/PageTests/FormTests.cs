namespace Nancy.ViewEngines.React.Tests.PageTests
{
    using Pages;
    using Xunit;

    public class FormTests : TestBase
    {
        private readonly FormPage page;

        public FormTests(Fixture fixture)
            : base(fixture)
        {
            this.page = this.GoTo<FormPage>();
        }

        [Fact]
        public void Form_page_should_render_input_box_and_submit_button()
        {
            Assert.NotNull(this.page.InputBox);
            Assert.Equal(string.Empty, this.page.InputBox.GetAttribute("value"));

            Assert.NotNull(this.page.SubmitButton);
            Assert.Equal("Submit", this.page.SubmitButton.GetAttribute("value"));
        }

        [Fact]
        public void Submit_should_redirect_back_to_page()
        {
            string content = "content";

            this.page.InputBox.SendKeys(content);
            this.page.SubmitButton.Click();
            this.page.WaitUntil(driver => driver.Url.EndsWith(content));

            Assert.Equal($"{this.page.Url}/{content}", this.page.Driver.Url);
            Assert.Equal(content, this.page.InputBox.GetAttribute("value"));
        }
    }
}
