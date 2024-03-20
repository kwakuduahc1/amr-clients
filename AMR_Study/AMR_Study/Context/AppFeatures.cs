namespace AMR_Study.Context
{
    public class AppFeatures : IAppFeatures
    {
        public string AppName { get; }

        public string Key { get; }

        public string Audience { get; }

        public string Issuer { get; }

        public DateTime Expiry { get; }

        public AppFeatures(IConfiguration config)
        {
            var cnf = config.GetSection(nameof(AppFeatures));
            AppName = cnf.GetSection(nameof(AppName)).Value;
            Key = cnf.GetSection(nameof(Key)).Value;
            Issuer = cnf.GetSection(nameof(Issuer)).Value;
            Audience = cnf.GetSection(nameof(Audience)).Value;
            Expiry = DateTime.Now.AddDays(int.Parse(cnf.GetSection(nameof(Expiry)).Value));
        }
    }
}
