namespace Nancy.ViewEngines.React.Tests.Common
{
    using System.IO;

    internal static class Extension
    {
        internal static string ResolvePath(string path1, string path2) =>
            Path.GetFullPath(Path.Combine(path1, path2));
    }
}
