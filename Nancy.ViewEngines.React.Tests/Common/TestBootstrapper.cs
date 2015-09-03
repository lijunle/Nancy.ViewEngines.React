namespace Nancy.ViewEngines.React.Tests.Common
{
    using Bootstrapper;

    internal class TestBootstrapper : DefaultNancyBootstrapper
    {
        static TestBootstrapper()
        {
            var assemblyPath = Extension.ResolvePath(TestRootPathProvider.RootPath, "bin");
            AppDomainAssemblyTypeScanner.LoadAssemblies(assemblyPath, "Nancy.ViewEngines.React.*dll");
        }

        internal TestBootstrapper()
        {
            this.RootPathProvider = new TestRootPathProvider();
        }

        protected override IRootPathProvider RootPathProvider { get; }
    }
}
