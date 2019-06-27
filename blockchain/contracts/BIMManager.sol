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
contract BIMManager is IpfsHashHolder, Ownable, Pausable
{
    uint currentProblemId;
    uint currentSolutionId;

    mapping (address => bool) public registeredProblemOwners;
    mapping (address => bool) public registeredProblemOptimisers;
    mapping (address => uint) public problemOwnerProblemIds;
    mapping (uint => address) public problemIdAddresses;
    mapping (address => uint) public problemOptimiserSolutionIds;
    mapping (uint => address) public solutionIdAddresses;

    event ProblemOwnerRegistered(address indexed problemOwnerAddress);
    event ProblemOwnerUnregistered(address indexed problemOwnerAddress);
    event ProblemOptimiserRegistered(address indexed problemOptimiserAddress);
    event ProblemOptimiserUnregistered(address indexed problemOptimiserAddress);

    /// @notice Constructor for the BIMManager contract.
    /// @dev Takes no arguments, sets the currentTenderId to 1 (zero is used to mean null).
    constructor () public
    {
        currentProblemId = 1;
        currentSolutionId = 1;
    }

    /// @notice Modifier which ensures that the sender is registerd as a Problem Owner.
    /// @dev Checks that the sender address has an entry in registeredProblemOwners.
    modifier callerIsProblemOwner()
    {
        require (registeredProblemOwners[msg.sender], "Caller is not a registered Problem Owner");
        _;
    }

    /// @notice Modifier which ensures that the sender is registerd as a Problem Optimiser.
    /// @dev Checks that the sender address has an entry in registeredProblemOwners.
    modifier callerIsProblemOptimiser()
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
        require(registeredProblemOwners[msg.sender], "Address already registered as a Problem Owner");

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
        require(registeredProblemOptimisers[msg.sender], "Address already registered as a Problem Optimiser");

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
        callerIsProblemOwner()
        returns (address)
    {
        problemOwnerProblemIds[msg.sender] = currentProblemId;

        address newProblemAddress = address((new Problem).value(msg.value)(currentProblemId));
        problemIdAddresses[currentProblemId] = newProblemAddress;
        currentProblemId += 1;
        return newProblemAddress;
    }

    /// @notice Creates a new Solution for a registerd problem optimiser
    /// @dev Deploys a new instance of the Solution contract, and associates it with the calling Problem owner.
    function createSolution(uint problemId)
        public
        whenNotPaused()
        callerIsProblemOptimiser()
        returns (address)
    {
        problemOptimiserSolutionIds[msg.sender] = currentSolutionId;

        address newSolutionAddress = address(new Solution(problemIdAddresses[problemId], currentSolutionId));
        solutionIdAddresses[currentSolutionId] = newSolutionAddress;
        currentSolutionId += 1;
        return newSolutionAddress;
    }
}
