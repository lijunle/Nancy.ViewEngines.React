namespace Nancy.ViewEngines.React.Example.Modules
{
    using Bootstrapper;
    using Security;

    public class CsrfModule : NancyModule
    {
        public CsrfModule()
        {
            this.Get["csrf"] = _ => new CsrfModel();
        }

        public class CsrfApplicationStartup : IApplicationStartup
        {
            public void Initialize(IPipelines pipelines) =>
                Csrf.Enable(pipelines);
        }

        private class CsrfModel
        {
        }
    }
}
