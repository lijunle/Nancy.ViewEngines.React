namespace Nancy.ViewEngines.React.Example.Modules
{
    public class ConsoleModule : NancyModule
    {
        public ConsoleModule()
        {
            this.Get["console"] = _ => new ConsoleModel();
        }

        private class ConsoleModel
        {
        }
    }
}
