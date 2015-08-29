namespace Nancy.ViewEngines.React.Tests.Common
{
    using System.IO;
    using System.Linq;

    public class TestRootPathProvider : IRootPathProvider
    {
        private const string RootFolder = "Nancy.ViewEngines.React.Example";

        static TestRootPathProvider()
        {
            var assembly = typeof(TestRootPathProvider).Assembly;
            var assemblyPath = assembly.CodeBase.Replace("file:///", string.Empty);
            var assemblyFolder = ResolvePath(assemblyPath, "..");
            RootPath = ResolvePath(FindSolutionPath(assemblyFolder), RootFolder);
        }

        internal static string RootPath { get; }

        public string GetRootPath() =>
            RootPath;

        private static string FindSolutionPath(string path) =>
            IsSolutionPath(path)
            ? path
            : FindSolutionPath(ResolvePath(path, ".."));

        private static bool IsSolutionPath(string path) =>
            Directory.GetDirectories(path)
                .Select(Path.GetFileName)
                .Any(x => x == RootFolder);

        private static string ResolvePath(string path1, string path2) =>
            Path.GetFullPath(Path.Combine(path1, path2));
    }
}
