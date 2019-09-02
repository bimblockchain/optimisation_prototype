using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using grasshopper_extension;

namespace grasshopper_extension_console
{
    class Program
    {
        static void Main(string[] args)
        {

            var doSomething = new Transaction()
            {
                ContractAddress = "123",
                PrivateKey = "456",
                OptimisedValue = 43
            };
            BlockchainInteractions.SendOptimisedValue(doSomething).GetAwaiter().GetResult(); ;
            
            Console.ReadLine();

        }
    }
}
