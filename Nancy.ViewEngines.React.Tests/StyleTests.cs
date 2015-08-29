namespace Nancy.ViewEngines.React.Tests
{
    using System.Drawing;
    using System.Linq;
    using Pages;
    using Xunit;

    public class StyleTests : TestBase
    {
        private readonly StylePage page;

        public StyleTests(Fixture fixture)
            : base(fixture)
        {
            this.page = this.GoTo<StylePage>();
        }

        [Fact]
        public void Style_page_should_return_a_list_of_colors_and_a_form()
        {
            Assert.NotNull(this.page.ColorList);
            Assert.Equal(2, this.page.ColorItems.Count());
            Assert.Equal("yellow", this.page.ColorItems.ElementAt(0).Value);
            Assert.Equal("blue", this.page.ColorItems.ElementAt(1).Value);

            Assert.NotNull(this.page.InputBox);
            Assert.Equal("red", this.page.InputBox.GetAttribute("value"));

            Assert.NotNull(this.page.AddButton);
            Assert.Equal("Add", this.page.AddButton.GetAttribute("value"));
        }

        [Fact]
        public void Each_color_item_should_be_with_corresponding_text_and_background_color()
        {
            Assert.NotEmpty(this.page.ColorItems);

            foreach (var colorItem in this.page.ColorItems)
            {
                Assert.Contains(colorItem.Value, colorItem.Text);
                Assert.Equal(Color.FromName(colorItem.Value).ToArgb(), colorItem.BackgroundColor.ToArgb());
            }
        }

        [Fact]
        public void The_count_of_style_links_should_equal_to_the_count_of_color_items()
        {
            Assert.NotEqual(0, this.page.StyleLinks.Count());
            Assert.Equal(this.page.ColorItems.Count(), this.page.StyleLinks.Count());
        }

        [Fact]
        public void Add_new_color_should_request_new_style_link()
        {
            string red = "red";
            Assert.Equal(red, this.page.InputBox.GetAttribute("value"));

            var previousStyleLinks = this.page.StyleLinks;

            this.page.AddButton.Click();
            var currentStyleLinks = this.page.StyleLinks;

            Assert.Equal(this.page.ColorItems.Count(), this.page.StyleLinks.Count());

            var addedStyleLinks = currentStyleLinks.Except(previousStyleLinks, StylePage.StyleLink.Comparer);
            Assert.Equal(1, addedStyleLinks.Count());

            var addedStyleLink = addedStyleLinks.Single();
            Assert.EndsWith(red, addedStyleLink.Href);
        }

        [Fact]
        public void Remove_existing_color_should_remove_corresponding_style_link()
        {
            string yellow = "yellow";
            var firstColorItem = this.page.ColorItems.First();
            Assert.Equal(yellow, firstColorItem.Value);

            var previousStyleLinks = this.page.StyleLinks;

            firstColorItem.Remove();
            var currentStyleLinks = this.page.StyleLinks;

            Assert.Equal(this.page.ColorItems.Count(), this.page.StyleLinks.Count());

            var removedStyleLinks = previousStyleLinks.Except(currentStyleLinks, StylePage.StyleLink.Comparer);
            Assert.Equal(1, removedStyleLinks.Count());
            Assert.False(currentStyleLinks.Any(link => link.Href.EndsWith(yellow)));
        }
    }
}
