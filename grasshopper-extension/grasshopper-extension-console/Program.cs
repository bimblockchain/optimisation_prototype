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

            var doSomething = new Transaction() { To = "test", From = "456" };
            BlockchainInteractions.HitTheAddMethod(doSomething).GetAwaiter().GetResult(); ;
            
            Console.ReadLine();

        }
    }
}
