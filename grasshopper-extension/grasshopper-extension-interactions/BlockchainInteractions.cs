using System;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Threading.Tasks;

namespace grasshopper_extension
{
    public class BlockchainInteractions
    {

        static BlockchainInteractions()
        {
            client.BaseAddress = new Uri("http://localhost:3001/");
            client.DefaultRequestHeaders.Accept.Clear();
            client.DefaultRequestHeaders.Accept.Add(
                new MediaTypeWithQualityHeaderValue("application/json"));
        }

        static HttpClient client = new HttpClient();

        public static async Task<Uri> SendOptimisedValue(Transaction transaction)
        {
            HttpResponseMessage response = await client.PostAsJsonAsync(
            "sendTransaction", transaction);
            response.EnsureSuccessStatusCode();

            // return URI of the created resource.
            return response.Headers.Location;
        }
    }
}
