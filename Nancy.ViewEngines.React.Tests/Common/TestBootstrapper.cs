namespace Nancy.ViewEngines.React.Tests.Common
{
    using System.IO;
    using Bootstrapper;
    using TinyIoc;

    internal class TestBootstrapper : DefaultNancyBootstrapper
    {
        static TestBootstrapper()
        {
            var assemblyPath = ResolvePath(TestRootPathProvider.RootPath, "bin");
            AppDomainAssemblyTypeScanner.LoadAssemblies(assemblyPath, "Nancy.ViewEngines.React.*dll");
        }

        internal TestBootstrapper()
        {
            this.RootPathProvider = new TestRootPathProvider();
        }

        protected override IRootPathProvider RootPathProvider { get; }

        private static string ResolvePath(string path1, string path2) =>
            Path.GetFullPath(Path.Combine(path1, path2));
    }
}
