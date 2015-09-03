namespace Nancy.ViewEngines.React.Tests.PageTests
{
    using Pages;
    using Xunit;

    public class TitleTests : TestBase
    {
        private readonly TitlePage page;

        public TitleTests(Fixture fixture)
            : base(fixture)
        {
            this.page = this.GoTo<TitlePage>();
        }

        [Fact]
        public void Title_should_render_fine()
        {
            Assert.NotNull(this.page);
            Assert.Equal("This is title", this.page.Title);
        }

        [Fact]
        public void Update_title_should_work_fine()
        {
            string newTitle = "A new title";

            this.page.TitleBox.Clear();
            this.page.TitleBox.SendKeys(newTitle);
            this.page.UpdateButton.Click();
            this.page.WaitUntil(driver => driver.Title == newTitle);

            Assert.Equal(newTitle, this.page.Title);

            // continue to update title to another value.
            string anotherTitle = "Another title";

            this.page.TitleBox.Clear();
            this.page.TitleBox.SendKeys(anotherTitle);
            this.page.UpdateButton.Click();
            this.page.WaitUntil(driver => driver.Title == anotherTitle);

            Assert.Equal(anotherTitle, this.page.Title);
        }
    }
}
