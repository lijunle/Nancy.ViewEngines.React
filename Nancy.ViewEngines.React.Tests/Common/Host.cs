namespace Nancy.ViewEngines.React.Tests.Common
{
    using System;
    using Hosting.Self;

    public class Host : IDisposable
    {
        internal const string Url = "http://localhost:64343";

        private readonly NancyHost host;

        public Host()
        {
            var uri = new Uri(Url);
            var bootstrapper = new TestBootstrapper();
            var configuration = new HostConfiguration
            {
                UrlReservations = new UrlReservations
                {
                    CreateAutomatically = true
                }
            };

            this.host = new NancyHost(uri, bootstrapper, configuration);
            this.host.Start();
        }

        public void Dispose()
        {
            this.host.Dispose();
        }
    }
}
