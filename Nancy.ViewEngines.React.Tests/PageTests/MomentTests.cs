namespace Nancy.ViewEngines.React.Tests.PageTests
{
    using System;
    using System.Threading;
    using Pages;
    using Xunit;

    public class MomentTests : TestBase
    {
        private readonly MomentPage page;

        public MomentTests(Fixture fixture)
            : base(fixture)
        {
            this.page = this.GoTo<MomentPage>();
        }

        [Fact]
        public void Moment_page_should_render_label_and_current_time()
        {
            Assert.StartsWith("Current time:", this.page.Text);
            Assert.InRange(this.page.Time, DateTime.Now - TimeSpan.FromSeconds(1.2), DateTime.Now);
        }

        [Fact]
        public void Current_time_should_continuously_update()
        {
            DateTime previousTime = DateTime.MinValue;

            for (var i = 0; i < 3; i++)
            {
                if (i != 0)
                {
                    Thread.Sleep(TimeSpan.FromSeconds(1));

                    Assert.Equal(previousTime + TimeSpan.FromSeconds(1), this.page.Time);
                }

                previousTime = this.page.Time;
            }
        }
    }
}
