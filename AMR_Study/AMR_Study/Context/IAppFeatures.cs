namespace AMR_Study.Context
{
    public interface IAppFeatures
    {
        string AppName { get; }

        string Key { get; }

        string Audience { get; }

        string Issuer { get; }

        DateTime Expiry { get; }
    }
}