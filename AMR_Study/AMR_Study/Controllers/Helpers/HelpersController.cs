//using KathBeds.Context;
//using Microsoft.AspNetCore.Cors;
//using Microsoft.AspNetCore.Mvc;
//using Microsoft.EntityFrameworkCore;
//using System.Collections;
//using System.Security.Cryptography;

//namespace SalesManager.Controllers.Helpers
//{
//    //[Authorize(Roles = "Power, Cashier")]
//    [EnableCors("bStudioApps")]
//    public class HelpersController : Controller
//    {
//        private readonly ApplicationDbContext db;

//        public HelpersController(DbContextOptions<ApplicationDbContext> dbContextOptions) => db =  new ApplicationDbContext(dbContextOptions);


//        [HttpGet]
//        public async Task<string> GetToken()
//        {
//            string code = "";
//            bool cont = false;
//            while (cont == false)
//            {
//                code = RandomString(new Random().Next(8, 10));
//                if (!await db.Payments.AnyAsync(x => x.Receipt == code))
//                    cont = true;
//            }
//            return code;
//        }

//        static string RandomString(int length)
//        {
//            string alphabet = "ABCDEFGHIJKLMNPQRTUVWXYZ0123456789";
//            var outOfRange = byte.MaxValue + 1 - (byte.MaxValue + 1) % alphabet.Length;

//            return string.Concat(
//                Enumerable
//                    .Repeat(0, byte.MaxValue)
//                    .Select(e => RandomByte())
//                    .Where(randomByte => randomByte < outOfRange)
//                    .Take(length)
//                    .Select(randomByte => alphabet[randomByte % alphabet.Length])
//            );
//        }

//        static byte RandomByte()
//        {
//            //var randomBytes= new byte[32];
//            //string refreshToken = "";
//            return RandomNumberGenerator.GetBytes(32).Single();
//            //using (var rng = RandomNumberGenerator.Create())
//            //{
//            //    rng.GetBytes(randomBytes);
//            //    //refreshToken = Convert.ToBase64String(randomNumber);
//            //}
//            //return randomBytes.Single();
//        }
//    }
//}