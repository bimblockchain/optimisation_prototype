pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "openzeppelin-solidity/contracts/lifecycle/Pausable.sol";
import "./IpfsHashHolder.sol";
import "./Problem.sol";
import "./Solution.sol";

/// @title BIMManager: Blockchain Solver Plug-in for Grasshopper
// Connects the Rhino 3D Modelling Software with Grasshopper scripting and Galapagos solver
// to the Ethereum Blockchain to submit and solve optimisation problems with rewards.
/// @dev Contract Project will inherit the contracts Ownable and Pausable from the OpenZeppelin library
/// @dev Pausable is a circuit breaker which blocks all contract functions expect withdrawal by the owner
/// @author Andy Watt & Colin McCrae
contract BIMManager is Ownable, Pausable, IpfsHashHolder
{
    uint totalProblems; // Initially zero
    uint totalSolutions; // Initially zero

    mapping (address => bool) public registeredProblemOwners;
    mapping (address => uint) public problemOwnerProblemIds;
    mapping (uint => address) public problemIdAddresses;
    mapping (address => bool) public registeredProblemOptimisers;
    mapping (address => uint) public problemOptimiserSolutionIds;
    mapping (uint => address) public solutionIdAddresses;

    event ProblemOwnerRegistered(address indexed problemOwnerAddress);
    event ProblemOwnerUnregistered(address indexed problemOwnerAddress);
    event ProblemOptimiserRegistered(address indexed problemOptimiserAddress);
    event ProblemOptimiserUnregistered(address indexed problemOptimiserAddress);
    event ProblemCreated(address indexed problemOwnerAddress, address indexed newProblemAddress);
    event SolutionCreated(address indexed problemOptimiserAddress, address indexed newSolutionAddress, address indexed problemAddress);

    // No non-default constructor required

    /// @notice Modifier which ensures that the sender is registered as a Problem Owner.
    /// @dev Checks that the sender address has an entry in registeredProblemOwners.
    modifier callerIsRegisteredProblemOwner()
    {
        require (registeredProblemOwners[msg.sender], "Caller is not a registered Problem Owner");
        _;
    }

    /// @notice Modifier which ensures that the sender is registered as a Problem Optimiser.
    /// @dev Checks that the sender address has an entry in registeredProblemOptimisers.
    modifier callerIsRegisteredProblemOptimiser()
    {
        require (registeredProblemOptimisers[msg.sender], "Caller is not a registered Problem Optimiser");
        _;
    }

    /// @notice Registers a new Problem Owner.
    /// @dev updates the registeredProblemOwners mapping.
    /// @return a boolean indicating success.
    function registerProblemOwner()
        public
        whenNotPaused()
        returns (bool)
    {
        require(!registeredProblemOwners[msg.sender], "Address already registered as a Problem Owner");

        registeredProblemOwners[msg.sender] = true;

        emit ProblemOwnerRegistered(msg.sender);

        return true;
    }

    /// @notice Unregisters an existing Problem Owner.
    /// @dev updates the registeredProblemOwners mapping.
    /// @return a boolean indicating success.
    function unregisterProblemOwner()
        public
        whenNotPaused()
        returns (bool)
    {
        require(registeredProblemOwners[msg.sender], "Address not registered as a Problem Owner");

        registeredProblemOwners[msg.sender] = false;

        emit ProblemOwnerUnregistered(msg.sender);

        return true;
    }

    /// @notice Registers a new Problem Optimiser.
    /// @dev updates the registeredProblemOptimisers mapping.
    /// @return a boolean indicating success.
    function registerProblemOptimiser()
        public
        whenNotPaused()
        returns (bool)
    {
        require(!registeredProblemOptimisers[msg.sender], "Address already registered as a Problem Optimiser");

        registeredProblemOptimisers[msg.sender] = true;

        emit ProblemOptimiserRegistered(msg.sender);

        return true;
    }

    /// @notice Unregisters an existing Problem Owner.
    /// @dev updates the registeredProblemOwners mapping.
    /// @return a boolean indicating success.
    function unregisterProblemOptimiser()
        public
        whenNotPaused()
        returns (bool)
    {
        require(registeredProblemOptimisers[msg.sender], "Address not registered as a Problem Optimiser");

        registeredProblemOptimisers[msg.sender] = false;

        emit ProblemOptimiserUnregistered(msg.sender);

        return true;
    }

    /// @notice Creates a new problem for a registered problem owner.
    /// @dev Deploys a new instance of the Problem contract, and associates it with the calling problem owner.
    function createProblem()
        public
        payable
        whenNotPaused()
        callerIsRegisteredProblemOwner()
        returns (address)
    {
        totalProblems += 1;
        problemOwnerProblemIds[msg.sender] = totalProblems;

        address newProblemAddress = address((new Problem).value(msg.value)(totalProblems, msg.sender));
        problemIdAddresses[totalProblems] = newProblemAddress;

        emit ProblemCreated(msg.sender, newProblemAddress);

        return newProblemAddress;
    }

    /// @notice Creates a new Solution for a registerd problem optimiser
    /// @dev Deploys a new instance of the Solution contract, and associates it with the calling Problem owner.
    function createSolution(uint problemId)
        public
        whenNotPaused()
        callerIsRegisteredProblemOptimiser()
        returns (address)
    {
        totalSolutions += 1;
        problemOptimiserSolutionIds[msg.sender] = totalSolutions;

        address newSolutionAddress = address(new Solution(problemIdAddresses[problemId], totalSolutions));
        solutionIdAddresses[totalSolutions] = newSolutionAddress;

        emit SolutionCreated(msg.sender, newSolutionAddress, problemIdAddresses[problemId]);

        return newSolutionAddress;
    }

    /// @dev Returns the current total number of problems
    function getTotalProblems()
        public
        view
        returns (uint)
        {
        return totalProblems;
    }

    /// @dev Returns the current total number of solutions
    function getTotalSolutions()
        public
        view
        returns (uint)
        {
        return totalSolutions;
    }

    /// @notice Attaches an IPFS hash to either a tender or a bid
    /// @dev Attaches an IPFS hash to either a tender or a bid
    function associateIPFS (string memory ipfsHash, address ipfsHolderAddress)
        public
        returns (bool)
    {
        IpfsHashHolder ipfsHashHolder = IpfsHashHolder(address(ipfsHolderAddress));
        ipfsHashHolder.setIpfsHash(ipfsHash);
        return true;
    }

    /// @notice. A shortcut to send a value to a solution by ID
    /// @dev Shortcuts straight to the solution.
    function sendValueToSolution(uint solutionId, uint optimisedValue)
    public
    returns (bool)
    {
        Solution solution = Solution(address(solutionIdAddresses[solutionId]));
        solution.sendValue(optimisedValue);
        return true;
    }
}
