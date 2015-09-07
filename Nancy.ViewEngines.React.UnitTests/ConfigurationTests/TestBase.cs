namespace Nancy.ViewEngines.React.UnitTests.ConfigurationTests
{
    using System;
    using System.Configuration;
    using System.IO;

    public abstract class TestBase
    {
        public TestBase(string fileName)
        {
            this.Configuration = GetConfiguration(fileName);
        }

        internal ReactConfiguration Configuration { get; }

        private static string AssemblyPath
        {
            get
            {
                // e.g., file:///C:/project/bin/web.dll
                string codeBase = typeof(DefaultTest).Assembly.CodeBase;

                // e.g., C:/project/bin/web.dll
                string assemblyFilePath = new Uri(codeBase).LocalPath;

                // e.g., C:/project/bin/
                string assemblyPath = Path.GetDirectoryName(assemblyFilePath);
                return assemblyPath;
            }
        }

        private static ReactConfiguration GetConfiguration(string fileName)
        {
            var filePath = Extension.ResolvePath(
                AssemblyPath,
                "ConfigurationFixtures",
                fileName);

            var fileMap = new ExeConfigurationFileMap
            {
                ExeConfigFilename = filePath
            };

            var configuration = ConfigurationManager.OpenMappedExeConfiguration(
                fileMap,
                ConfigurationUserLevel.None);

            var section =
                configuration.GetSection("reactViewEngine") as ReactConfiguration ??
                new ReactConfiguration();

            return section;
        }
    }
}
