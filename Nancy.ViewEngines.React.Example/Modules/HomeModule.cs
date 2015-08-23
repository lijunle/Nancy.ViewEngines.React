namespace Nancy.ViewEngines.React.Example.Modules
{
    public class HomeModule : NancyModule
    {
        public HomeModule()
        {
            this.Get["/"] = _ => new HomeModel("Hello world");
        }

        private class HomeModel
        {
            public HomeModel(string text)
            {
                this.Text = text;
            }

            public string Text { get; }
        }
    }
}
