namespace Nancy.ViewEngines.React.Example.Modules
{
    public class ExceptionModule : NancyModule
    {
        public ExceptionModule()
        {
            this.Get["exception"] = _ => new ExceptionModel();
        }

        private class ExceptionModel
        {
        }
    }
}
