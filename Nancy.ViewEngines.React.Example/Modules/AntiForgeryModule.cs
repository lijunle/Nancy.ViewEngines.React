namespace Nancy.ViewEngines.React.Example.Modules
{
    using Bootstrapper;
    using Security;

    public class AntiForgeryModule : NancyModule
    {
        public AntiForgeryModule()
        {
            this.Get["anti-forgery"] = _ => new AntiForgeryModel();

            this.Post["anti-forgery"] = _ =>
            {
                this.ValidateCsrfToken();
                return new AntiForgeryModel(this.Request.Form.Title);
            };
        }

        public class AntiForgeryApplicationStartup : IApplicationStartup
        {
            public void Initialize(IPipelines pipelines) =>
                Csrf.Enable(pipelines);
        }

        private class AntiForgeryModel
        {
            internal AntiForgeryModel(string title = null)
            {
                this.Title = title;
            }

            public string Title { get; }
        }
    }
}
