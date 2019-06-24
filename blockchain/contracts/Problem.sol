pragma solidity ^0.5.0;

import "./IpfsHashHolder.sol";

/// @title A contract representing a BIM Problem being represented on the Blockchian
/// @author Andy Watt & Colin McCrae
contract Problem
{
    uint public problemId;

    constructor (uint _problemId) public payable
    {
        problemId = _problemId;



    }
}

