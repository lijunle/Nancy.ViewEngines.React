namespace Nancy.ViewEngines.React.Example.Modules
{
    using System.Collections.Generic;
    using Responses;

    public class StyleModule : NancyModule
    {
        public StyleModule()
        {
            this.Get["style"] = _ => new TestModel("Background should be yellow.");

            this.Get["style/css"] = _ => new TextResponse("code { background: yellow }", "text/css");
        }

        private class TestModel
        {
            public TestModel(string text)
            {
                this.Text = text;
            }

            public string Text { get; }

            public IEnumerable<string> Styles =>
                new[]
                {
                    "/style/css"
                };
        }
    }
}
