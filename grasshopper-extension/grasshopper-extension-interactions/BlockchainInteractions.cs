using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace grasshopper_extension
{
    public class BlockchainInteractions
    {
        public string CreateJson(string address, string password, double value)
        {
            return $" PWD:{password} - ADD:{address} - Param:{value} - From Class Lib 123456";
        }

        static BlockchainInteractions()
        {
            client.BaseAddress = new Uri("http://localhost:3000/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
        }

        static HttpClient client = new HttpClient();

        public static async Task<Uri> HitTheAddMethod(Transaction transaction)
        {
            HttpResponseMessage response = await client.PostAsJsonAsync(
            "add", transaction);
            response.EnsureSuccessStatusCode();

            // return URI of the created resource.
            return response.Headers.Location;
        }

    }
}
