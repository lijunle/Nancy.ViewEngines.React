namespace Nancy.ViewEngines.React.Example.Modules
{
    public class FormModule : NancyModule
    {
        public FormModule()
        {
            this.Get["form/{text?}"] = parameters => new FormModel(parameters.Text);

            this.Post["form/submit"] = _ => $"/form/{this.Context.Request.Form.Text}";
        }

        private class FormModel
        {
            public FormModel(string text)
            {
                this.Text = text;
            }

            public string Text { get; }
        }
    }
}
