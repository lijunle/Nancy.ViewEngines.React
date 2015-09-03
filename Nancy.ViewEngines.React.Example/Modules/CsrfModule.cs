namespace Nancy.ViewEngines.React.Example.Modules
{
    using Bootstrapper;
    using Security;

    public class CsrfModule : NancyModule
    {
        public CsrfModule()
        {
            this.Get["csrf"] = _ => new CsrfModel();

            this.Post["csrf"] = _ =>
            {
                this.ValidateCsrfToken();
                return new CsrfModel(this.Request.Form.Title);
            };
        }

        public class CsrfApplicationStartup : IApplicationStartup
        {
            public void Initialize(IPipelines pipelines) =>
                Csrf.Enable(pipelines);
        }

        private class CsrfModel
        {
            internal CsrfModel(string title = null)
            {
                this.Title = title;
            }

            public string Title { get; }
        }
    }
}
