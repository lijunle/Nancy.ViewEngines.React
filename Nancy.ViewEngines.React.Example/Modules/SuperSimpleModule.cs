namespace Nancy.ViewEngines.React.Example.Modules
{
    public class SuperSimpleModule : NancyModule
    {
        public SuperSimpleModule()
        {
            this.Get["super-simple"] = _ => new SuperSimpleModel();
        }

        private class SuperSimpleModel
        {
            public string Name => "Super Simple view engine";
        }
    }
}
