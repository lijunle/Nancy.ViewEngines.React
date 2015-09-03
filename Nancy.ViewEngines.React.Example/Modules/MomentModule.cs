namespace Nancy.ViewEngines.React.Example.Modules
{
    public class MomentModule : NancyModule
    {
        public MomentModule()
        {
            this.Get["moment"] = _ => new MomentModel();
        }

        private class MomentModel
        {
        }
    }
}
