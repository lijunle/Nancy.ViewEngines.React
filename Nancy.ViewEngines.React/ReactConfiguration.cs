namespace Nancy.ViewEngines.React
{
    using System;
    using System.Collections.Generic;
    using System.Configuration;
    using System.Diagnostics;
    using System.IO;
    using System.Linq;
    using System.Reflection;
    using Json;

    internal static class ReactConfiguration
    {
        static ReactConfiguration()
        {
            DebugMode = AppDomain.CurrentDomain.GetAssemblies().Any(AssemblyInDebugMode);

            Serializer = new JavaScriptSerializer();
            Serializer.RegisterConverters(JsonSettings.Converters, JsonSettings.PrimitiveConverters);

            // e.g., C:/project/bin/
            string assemblyPath = GetAssemblyPath();

            // e.g., /assets/
            PublicPath = string.Concat('/', GetSettingOrDefault("publicPath", "assets").Trim('/'), '/');

            // e.g., C:/project/bin/client/
            ClientPath = Extension.ResolvePath(assemblyPath, GetSettingOrDefault("clientPath", "client"));

            // e.g., ['jsx']
            Extensions = GetSettingOrDefault("extensions", "jsx").Split(';').Select(x => x.TrimStart('.'));

            // must be place at the end of configuration initialization
            Script = new BundleConfiguration("scriptBundleName", "script.js");
            Style = new BundleConfiguration("styleBundleName", "style.css");
        }

        internal static bool DebugMode { get; }

        internal static string ClientPath { get; }

        internal static string PublicPath { get; }

        internal static IEnumerable<string> Extensions { get; }

        internal static BundleConfiguration Script { get; }

        internal static BundleConfiguration Style { get; }

        internal static JavaScriptSerializer Serializer { get; }

        private static string GetAssemblyPath()
        {
            // e.g., file:///C:/project/bin/web.dll
            string codeBase = typeof(ReactConfiguration).Assembly.CodeBase;

            // e.g., C:/project/bin/web.dll
            string assemblyFilePath = new Uri(codeBase).LocalPath;

            // e.g., C:/project/bin/
            string assemblyPath = Path.GetDirectoryName(assemblyFilePath);
            return assemblyPath;
        }

        private static string GetSettingOrDefault(string key, string defaultValue)
        {
            string value = ConfigurationManager.AppSettings[key];
            return string.IsNullOrWhiteSpace(value) ? defaultValue : value;
        }

        private static bool AssemblyInDebugMode(Assembly assembly) =>
            assembly.GetCustomAttributes<DebuggableAttribute>().Any(x => x.IsJITTrackingEnabled);

        internal class BundleConfiguration
        {
            public BundleConfiguration(string settingKey, string defaultValue)
            {
                string name = GetSettingOrDefault(settingKey, defaultValue);

                this.Request = string.Concat(PublicPath, name);
                this.Path = Extension.ResolvePath(ClientPath, name);

                this.MapRequest = string.Concat(this.Request, ".map");
                this.MapPath = string.Concat(this.Path, ".map");

                this.HashCode = GetFileHashCode(this.Path);
                this.InjectionEnabled = File.Exists(this.Path);
            }

            internal string Request { get; }

            internal string Path { get; }

            internal string MapRequest { get; }

            internal string MapPath { get; }

            internal int HashCode { get; }

            internal bool InjectionEnabled { get; }

            private static int GetFileHashCode(string path)
            {
                // although two different object do not guarantee hash code different, it is OK here.
                var info = new FileInfo(path);
                int hashCode = Math.Abs(info.LastWriteTimeUtc.GetHashCode());
                return hashCode;
            }
        }
    }
}
