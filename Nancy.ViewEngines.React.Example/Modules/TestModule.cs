namespace Nancy.ViewEngines.React.Example.Modules
{
    public class TestModule : NancyModule
    {
        public TestModule()
        {
            this.Get["/"] = _ => new TestModel("Hello world");
        }

        private class TestModel
        {
            public TestModel(string text)
            {
                this.Text = text;
            }

            public string Text { get; }
        }
    }
}
