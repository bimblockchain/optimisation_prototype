pragma solidity ^0.5.0;

contract IpfsHashHolder
{
    /// @notice The variable too store the IPFS hash
    /// @dev The variable too store the IPFS hash
    string public ipfsHash;

    /// @notice An event which is raised whhen the hash is set
    /// @dev Emits a string param representing the hash
    event ipfsSent(string _ipfsHash);

    /// @notice This modifier tests that a valid IPFS hash is submitted
    /// @dev At this stage, this only protects against an empty string
    /// @param _ipfsHash a string which should represent a valid IPFS hash
    modifier validIpfsHash (string memory _ipfsHash)
    {
        bytes memory stringTest = bytes(_ipfsHash);

        // Further work is required on this functin to accurately identify a valid string
        require (stringTest.length > 0, "String must not be empty");
        _;
    }

    /// @notice This fdunction sets the IpfsHash string
    /// @dev See comments on validIpfsHash modifier. Emits ipfsSent event
    /// @param _ipfsHash a string which should represent a valid IPFS hash
    function setIpfsHash(string memory _ipfsHash)
        public
        validIpfsHash(_ipfsHash)
        returns (string memory)
    {
        ipfsHash = _ipfsHash;
        emit ipfsSent(_ipfsHash);
        return ipfsHash;
    }

    /// @notice Clears the stored hash
    /// @dev Clears the strores hash
    function clearHash()
        public
        returns (bool)
    {
        ipfsHash = "";
        emit ipfsSent(ipfsHash);
    }

    /// @notice Checks if the IPFS hash is set or not
    /// @dev Converts the hash to a byte arrayu, and tests that it's length is >0
    function hashIsSet()
        public
        view
        returns (bool)
    {
        bytes memory stringTest = bytes(ipfsHash);
        // This is not a true test - should be chacking for IPFS valididy
        return stringTest.length > 0;
    }
}