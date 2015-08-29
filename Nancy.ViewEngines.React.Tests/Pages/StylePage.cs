namespace Nancy.ViewEngines.React.Tests.Pages
{
    using System;
    using System.Collections.Generic;
    using System.Drawing;
    using System.Linq;
    using OpenQA.Selenium;

    internal class StylePage : PageBase
    {
        internal IWebElement ColorList =>
            this.Driver.FindElement(By.TagName("ul"));

        internal IEnumerable<ColorItem> ColorItems =>
            this.ColorList.FindElements(By.TagName("li"))
                .Select(element => new ColorItem(element));

        internal IEnumerable<StyleLink> StyleLinks =>
            this.Driver.FindElements(By.TagName("link"))
                .Select(element => new StyleLink(element));

        internal IWebElement InputBox =>
            this.Driver.FindElement(By.CssSelector("input[type=text]"));

        internal IWebElement AddButton =>
            this.Driver.FindElement(By.CssSelector("input[type=button]"));

        protected override string Path => "style";

        internal class ColorItem
        {
            private readonly IWebElement element;

            internal ColorItem(IWebElement element)
            {
                this.element = element;
            }

            internal string Value =>
                this.element.GetAttribute("class");

            internal string Text =>
                this.element.Text;

            internal Color BackgroundColor
            {
                get
                {
                    int[] rgba = this.element.GetCssValue("background-color")
                        .Substring("rgba".Length)
                        .Trim('(', ')')
                        .Split(',')
                        .Select(x => x.Trim())
                        .Select(x => int.Parse(x))
                        .ToArray();

                    // ignore the alpha component value.
                    return Color.FromArgb(rgba[0], rgba[1], rgba[2]);
                }
            }

            internal void Remove() =>
                this.element.FindElement(By.TagName("button")).Click();
        }

        internal class StyleLink
        {
            private readonly IWebElement element;

            static StyleLink()
            {
                Comparer = new StyleLinkComparer();
            }

            internal StyleLink(IWebElement element)
            {
                this.element = element;
            }

            internal static IEqualityComparer<StyleLink> Comparer { get; }

            internal string Href =>
                this.element.GetAttribute("href");

            private class StyleLinkComparer : IEqualityComparer<StyleLink>
            {
                public bool Equals(StyleLink x, StyleLink y) =>
                    x.element.Equals(y.element);

                public int GetHashCode(StyleLink styleLink) =>
                    styleLink.element.GetHashCode();
            }
        }
    }
}
