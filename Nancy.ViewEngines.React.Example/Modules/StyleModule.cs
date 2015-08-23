namespace Nancy.ViewEngines.React.Example.Modules
{
    using System.Collections.Generic;
    using Responses;

    public class StyleModule : NancyModule
    {
        public StyleModule()
        {
            this.Get["style"] = _ => new StyleModel();

            this.Get["style/color/{color}"] = parameters =>
            {
                var color = parameters.Color;
                var css = $".{color} {{ background: {color} }}";
                return new TextResponse(css, "text/css");
            };
        }

        private class StyleModel
        {
            public IEnumerable<string> Styles =>
                new[]
                {
                    "/style/color/yellow",
                    "/style/color/blue"
                };
        }
    }
}
