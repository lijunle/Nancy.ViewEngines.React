namespace Nancy.ViewEngines.React.Example.Modules
{
    public class TitleModule : NancyModule
    {
        public TitleModule()
        {
            this.Get["title"] = _ => new TestModel("This is title");
        }

        private class TestModel
        {
            public TestModel(string title)
            {
                this.Title = title;
            }

            public string Title { get; }

            public string Text => "Render title.";
        }
    }
}
