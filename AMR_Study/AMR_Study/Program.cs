
using AMR_Study.Context;
using Microsoft.AspNetCore.Antiforgery;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.HttpOverrides;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Net;
using System.Text;

namespace AMR_Study
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            builder.Services.AddDbContext<ApplicationDbContext>(options =>
            {
                options.EnableSensitiveDataLogging(true);
                options.LogTo(Console.WriteLine, LogLevel.Information);
                options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection"));
            });

            builder.Services.AddIdentity<ApplicationUsers, ApplicationRoles>(x =>
            {
                x.SignIn.RequireConfirmedAccount = true;
                x.Password.RequiredLength = 8;
                x.Password.RequireNonAlphanumeric = true;
                x.Password.RequireDigit = true;
                x.Password.RequireUppercase = true;
                x.Password.RequireLowercase = true;
                x.Lockout.DefaultLockoutTimeSpan = TimeSpan.FromMinutes(30);
            })
                .AddEntityFrameworkStores<ApplicationDbContext>();
            builder.Services.AddSingleton<IAppFeatures, AppFeatures>();
            builder.Services.AddAuthentication(x =>
            {
                x.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                x.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(x =>
            {
                x.SaveToken = true;
                x.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(builder.Configuration?.GetSection("AppFeatures")?.GetSection("Key")?.Value)),
                    ValidateIssuer = true,
                    RequireExpirationTime = true,
                    ValidateAudience = false,
                    ValidateLifetime = true,
                    ValidIssuer = builder.Configuration.GetSection("AppFeatures").GetSection("Issuer").Value,
                    ValidAudience = builder.Configuration.GetSection("AppFeatures").GetSection("Audience").Value
                };
            });
            builder.Services.AddDataProtection();
            builder.Services.AddAntiforgery(options =>
            {
                options.HeaderName = "XSRF-TOKEN";
                options.Cookie = new CookieBuilder()
                {
                    Name = "XSRF-TOKEN",
                    IsEssential = true,
                    SameSite = builder.Environment.IsProduction() ? SameSiteMode.Lax : SameSiteMode.None,
                    Domain = builder.Configuration.GetSection("AppFeatures").GetSection("Issuer").Value,
                    SecurePolicy = CookieSecurePolicy.SameAsRequest
                };
            });
            builder.Services.AddCors(options =>
            {
                options.AddPolicy("bStudioApps",
                    x => x.WithOrigins("http://localhost:4200")
                    .WithHeaders("Content-Type", "Accept", "Origin", "Authorization", "X-XSRF-TOKEN", "XSRF-TOKEN", "enctype", "Access-Control-Allow-Origin", "Access-Control-Allow-Credentials")
                    .WithMethods("GET", "POST", "OPTIONS", "PUT", "DELETE")
                        .AllowCredentials());
            });

            builder.Services.Configure<ForwardedHeadersOptions>(options =>
            {
                options.KnownProxies.Add(IPAddress.Parse("10.0.0.100"));
            });

            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            /// Add services to the container.
            builder.Services.AddControllers(
                options => options.SuppressImplicitRequiredAttributeForNonNullableReferenceTypes = true
                );
            var app = builder.Build();

            app.UseForwardedHeaders(new ForwardedHeadersOptions
            {
                ForwardedHeaders = ForwardedHeaders.XForwardedFor | ForwardedHeaders.XForwardedProto
            });
            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseAuthentication();
            app.UseRouting();
            app.UseCors("bStuioApps");
            var antiforgery = app.Services.GetRequiredService<IAntiforgery>();

            app.Use((context, next) =>
            {
                var tokenSet = antiforgery.GetAndStoreTokens(context);
                context.Response.Cookies.Append("XSRF-TOKEN", tokenSet.RequestToken!,
                    new CookieOptions
                    {
                        HttpOnly = false,
                        IsEssential = true,
                        Secure = true,
                        SameSite = builder.Environment.IsProduction() ? SameSiteMode.Lax : SameSiteMode.None
                    });
                return next(context);
            });

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseHttpsRedirection();
            app.UseAuthorization();
            app.MapControllers();
            app.Run();
        }
    }
}
