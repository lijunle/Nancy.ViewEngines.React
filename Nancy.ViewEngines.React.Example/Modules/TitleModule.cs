namespace Nancy.ViewEngines.React.Example.Modules
{
    public class TitleModule : NancyModule
    {
        public TitleModule()
        {
            this.Get["title"] = _ => new TitleModel("This is title");
        }

        private class TitleModel
        {
            public TitleModel(string title)
            {
                this.Title = title;
            }

            public string Title { get; }
        }
    }
}
