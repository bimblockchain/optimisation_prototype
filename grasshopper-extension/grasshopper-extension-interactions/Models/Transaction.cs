using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace grasshopper_extension
{
    public class Transaction
    {
        public string ContractAddress { get; set; }
        public string PrivateKey { get; set; }
        public int OptimisedValue { get; set; }
    }
}
