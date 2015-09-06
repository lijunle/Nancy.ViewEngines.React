namespace Nancy.ViewEngines.React
{
    using System;
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
        }

        internal static bool DebugMode { get; }

        internal static JavaScriptSerializer Serializer { get; }

        private static bool AssemblyInDebugMode(Assembly assembly) =>
            assembly.GetCustomAttributes<DebuggableAttribute>().Any(x => x.IsJITTrackingEnabled);
    }
}
