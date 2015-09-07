namespace Nancy.ViewEngines.React
{
    using System;
    using System.Collections.Generic;
    using System.Diagnostics;
    using System.Linq;
    using System.Reflection;
    using Json;

    internal static class ReactStatics
    {
        static ReactStatics()
        {
            DebugMode = AppDomain.CurrentDomain.GetAssemblies().Any(AssemblyInDebugMode);

            Serializer = new JavaScriptSerializer();
            Serializer.RegisterConverters(JsonSettings.Converters, JsonSettings.PrimitiveConverters);

            Script = new ScriptStatics(ReactConfiguration.Instance);
            Server = new ServerStatics(ReactConfiguration.Instance);
        }

        internal static bool DebugMode { get; }

        internal static JavaScriptSerializer Serializer { get; }

        internal static ScriptStatics Script { get; }

        internal static ServerStatics Server { get; }

        private static bool AssemblyInDebugMode(Assembly assembly) =>
            assembly.GetCustomAttributes<DebuggableAttribute>().Any(x => x.IsJITTrackingEnabled);

        internal class ScriptStatics
        {
            internal ScriptStatics(ReactConfiguration configuration)
            {
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
        }

        internal class ServerStatics
        {
            internal ServerStatics(ReactConfiguration configuration)
            {
            }

            internal string AssetsPath { get; }
        }
    }
}
