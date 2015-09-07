namespace Nancy.ViewEngines.React
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.IO;
    using System.Linq;
    using System.Reflection;
    using Json;
    using static System.IO.Path;

    internal static class ReactStatics
    {
        static ReactStatics()
        {
            DebugMode = AppDomain.CurrentDomain.GetAssemblies().Any(AssemblyInDebugMode);

            Serializer = new JavaScriptSerializer();
            Serializer.RegisterConverters(JsonSettings.Converters, JsonSettings.PrimitiveConverters);

            Server = new ServerStatics(ReactConfiguration.Instance.Server);
            Script = new ScriptStatics(ReactConfiguration.Instance.Script, Server);
        }

        internal static bool DebugMode { get; }

        internal static JavaScriptSerializer Serializer { get; }

        internal static ScriptStatics Script { get; }

        internal static ServerStatics Server { get; }

        private static bool AssemblyInDebugMode(Assembly assembly) =>
            assembly.GetCustomAttributes<DebuggableAttribute>().Any(x => x.IsJITTrackingEnabled);

        internal class ScriptStatics
        {
            internal ScriptStatics(
                ReactConfiguration.ScriptElement script,
                ServerStatics server)
            {
                this.Dir = Extension.ResolvePath(AssemblyPath, script.Dir);

                this.Request = string.Concat(server.AssetsPath, script.Name);
                this.Path = Extension.ResolvePath(this.Dir, script.Name);

                this.MapRequest = string.Concat(this.Request, ".map");
                this.MapPath = string.Concat(this.Path, ".map");

                this.HashCode = GetFileHashCode(this.Path);
                this.InjectionEnabled = File.Exists(this.Path);

                this.Extensions = script.Extensions
                    .Cast<ReactConfiguration.ExtensionElement>()
                    .Where(x => !string.IsNullOrWhiteSpace(x.Name))
                    .Select(x => x.Name);

                this.PathMapping = GetPathMapping(
                    Extension.ResolvePath(this.Dir, "path.map"));
            }

            internal string Dir { get; }

            internal string Request { get; }

            internal string Path { get; }

            internal string MapRequest { get; }

            internal string MapPath { get; }

            internal int HashCode { get; }

            internal bool InjectionEnabled { get; }

            internal IEnumerable<string> Extensions { get; }

            internal IDictionary<string, int> PathMapping { get; }

            private static string AssemblyPath
            {
                get
                {
                    // e.g., file:///C:/project/bin/web.dll
                    string codeBase = typeof(ReactConfiguration).Assembly.CodeBase;

                    // e.g., C:/project/bin/web.dll
                    string assemblyFilePath = new Uri(codeBase).LocalPath;

                    // e.g., C:/project/bin/
                    string assemblyPath = GetDirectoryName(assemblyFilePath);
                    return assemblyPath;
                }
            }

            private static int GetFileHashCode(string path)
            {
                // although two different object do not guarantee hash code different, it is OK here.
                var info = new FileInfo(path);
                int hashCode = Math.Abs(info.LastWriteTimeUtc.GetHashCode());
                return hashCode;
            }

            private static IDictionary<string, int> GetPathMapping(string path)
            {
                var content = File.ReadAllText(path);
                var pathMapping = Serializer.Deserialize<Dictionary<string, int>>(content);
                return pathMapping;
            }
        }

        internal class ServerStatics
        {
            internal ServerStatics(ReactConfiguration.ServerElement server)
            {
                this.AssetsPath = $"/{server.Assets.Path.Trim('/')}/";
            }

            internal string AssetsPath { get; }
        }
    }
}
