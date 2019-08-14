using System;

namespace grasshopper_extension
{
    public class BlockchainInteractions
    {
        public string CreateJson(string address, string password, double value)
        {
            return $" PWD:{password} - ADD:{address} - Param:{value} - From Class Lib 123456";
        }
    }
}
