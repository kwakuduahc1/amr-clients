//namespace SalesManager.Controllers.Helpers
//{
//    using Microsoft.AspNetCore.Antiforgery;
//    using Microsoft.AspNetCore.Builder;
//    using Microsoft.AspNetCore.Http;
//    using System;
//    using System.Threading.Tasks;

//    namespace SpaAntiforgery
//    {
//        public class AppEnsureAntiforgeryTokenPresentOnPostsMiddleware(RequestDelegate next, IAntiforgery antiforgery)
//        {

//            private readonly RequestDelegate _next = next;
//            private readonly IAntiforgery _antiforgery = antiforgery;

//            public async Task Invoke(HttpContext httpContext)
//            {
//                var notAGetRerquest = !string.Equals("GET", httpContext.Request.Method, StringComparison.OrdinalIgnoreCase);
//                //Console.WriteLine("cus");
//                if (notAGetRerquest)
//                {
//                    // This will throw if the token is invalid.
//                    await _antiforgery.ValidateRequestAsync(httpContext);
//                }
//                await _next(httpContext);
//            }
//        }

//        public static class AppEnsureAntiforgeryTokenPresentOnPostsExtension
//        {
//            public static IApplicationBuilder EnsureAntiforgeryTokenPresentOnPosts(
//              this IApplicationBuilder builder)
//            {
//                return builder.UseMiddleware<AppEnsureAntiforgeryTokenPresentOnPostsMiddleware>();
//            }

//        }
//    }
//}
