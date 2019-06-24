pragma solidity ^0.5.0;

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/lifecycle/Pausable.sol";

/// @title Solutionise: Blockchain Solver Plug-in for Grasshopper
// Connects the Rhino 3D Modelling Software with Grasshopper scripting and Galapagos solver
// to the Ethereum Blockchain to submit and solve optimisation problems with rewards.
/// @dev Contract Project will inherit the contracts Ownable and Pausable from the OpenZeppelin library
/// @dev Pausable is a circuit breaker which blocks all contract functions expect withdrawal by the owner
contract Solutionise is Ownable, Pausable {

    // Global variables
    uint32 public totalProblems;
    uint32 public totalUsers;
    uint32 public totalSolutions;

    // Events
    event balanceNowUpdated(uint256 _newBalance);
    event problemNowRegistered(uint32 _problemIndex, string _problemId, string _ipfsHash, string _inputs,
        string _output, string _outputTarget, uint _reward, uint _expiry);
    event userNowRegistered(address _userAddress, string _username, address _payoutAddress);
    event userNowUpdated(address _userAddress, string _username, address _payoutAddress);
    event problemNowSolved(address userAddress, string problemId, uint timestamp);

    // Structs & Mappings
    struct Problem {
        string id;
        string ipfsHash; // IPFS hash of the problem files
        string inputs;
        string output;
        string outputTarget;
        uint reward;
        uint expiry;
    }
    mapping (string => uint32) private problemIndex; // 0 returned means problem ID is unregistered
    mapping (uint32 => Problem) public problemList; // Since index 0 means problem ID is unregistered, index 1 will be the first problem

    struct User {
        address userAddress;
        string username;
        address payoutAddress;
    }
    mapping (address => uint32) private userIndex; // 0 returned means user address is unregistered
    mapping (uint32 => User) public userList; // Since index 0 means user ID is unregistered, index 1 will be the first user

    // Records status of solution
    enum Status{initialised, submitted, rejected, approved}
    struct Solution {
        address userAddress;
        string problemId;
        uint timestamp;
        string ipfsHash; // IPFS hash of the solution files
        Status status;
    }
    mapping (uint32 => Solution) public solutionList;

    /// @dev Constructor
    /// @dev Initialize totals, and hardcode with the details of 5 problems and 3 users
    constructor() public {
        totalSolutions = 5; // Five problems are hardcoded into the constructor
        // totalSolutions = 0;
        totalUsers = 3; // Three test users are hardcoded into the constructor
        // totalUsers = 0;
        totalSolutions = 0;

        //  Hardcoded details for a test user, index 1, who is registered but hasn't started yet
        userIndex[0x32Be343B94f860124dC4fEe278FDCBD38C102D88] = 1;
        userList[1].userAddress = 0x32Be343B94f860124dC4fEe278FDCBD38C102D88;
        userList[1].username = "Test User 1";
        userList[1].payoutAddress = 0x32Be343B94f860124dC4fEe278FDCBD38C102D88;

        //  Hardcoded details for a test user, index 2, who is registered and almost finished the challenge
        userIndex[0x32Be343B94f860124dC4fEe278FDCBD38C102D88] = 2;
        userList[2].userAddress = 0x32Be343B94f860124dC4fEe278FDCBD38C102D88;
        userList[2].username = "Test User 2";
        userList[2].payoutAddress = 0x32Be343B94f860124dC4fEe278FDCBD38C102D88;

        //  Hardcoded details for a test user, index 3, who is registered and has completed the challenge
        userIndex[0x32Be343B94f860124dC4fEe278FDCBD38C102D88] = 3;
        userList[3].userAddress = 0x32Be343B94f860124dC4fEe278FDCBD38C102D88;
        userList[3].username = "Test User 3";
        userList[3].payoutAddress = 0x32Be343B94f860124dC4fEe278FDCBD38C102D88;

        // Hardcoded details for Problem index 1 (problem ID, IPFS hash, input variables to change, output variable
        // to optimise, output variable target value, reward value, and problem expiry date)
        problemIndex["16199909d0b5fd"] = 1; // Replace with actual ID
        problemList[1].id = "16199909d0b5fd"; // Replace with actual ID
        problemList[1].ipfsHash = "QmSHRv1r1Fb1TcefEebCxcLBUHmzQygoeWcZcXdUV7p5wX"; // Replace with actual IPFS hash
        problemList[1].inputs = "";
        problemList[1].output = "";
        problemList[1].outputTarget = "";
        problemList[1].reward = 0;
        problemList[1].expiry = 0;

        // Hardcoded details for Problem index 2 (problem ID, IPFS hash, input variables to change, output variable
        // to optimise, output variable target value, reward value, and problem expiry date)
        problemIndex["26199909d0b5fd"] = 2; // Replace with actual ID
        problemList[2].id = "26199909d0b5fd"; // Replace with actual ID
        problemList[2].ipfsHash = "QmUmm1eWhQQzekyUqeYztzvCTSeDWYp1SvFRK2pvSjuubn"; // Replace with actual IPFS hash
        problemList[2].inputs = "";
        problemList[2].output = "";
        problemList[2].outputTarget = "";
        problemList[2].reward = 0;
        problemList[2].expiry = 0;

        // Hardcoded details for Problem index 3 (problem ID, IPFS hash, input variables to change, output variable
        // to optimise, output variable target value, reward value, and problem expiry date)
        problemIndex["36199909d0b5fd"] = 3; // Replace with actual ID
        problemList[3].id = "36199909d0b5fd"; // Replace with actual ID
        problemList[3].ipfsHash = "QmZQx3e4mfD2gd1VyjivqjZnuhGLMTqWcRYw1DxqqBQejz"; // Replace with actual IPFS hash
        problemList[3].inputs = "";
        problemList[3].output = "";
        problemList[3].outputTarget = "";
        problemList[3].reward = 0;
        problemList[3].expiry = 0;

        // Hardcoded details for Problem index 4 (problem ID, IPFS hash, input variables to change, output variable
        // to optimise, output variable target value, reward value, and problem expiry date)
        problemIndex["46199909d0b5fd"] = 4; // Replace with actual ID
        problemList[4].id = "46199909d0b5fd"; // Replace with actual ID
        problemList[4].ipfsHash = "QmNfQTDGcioQAqrvkJoXuw3qFuJtFuSpFEu3dnRM11YKNE"; // Replace with actual IPFS hash
        problemList[4].inputs = "";
        problemList[4].output = "";
        problemList[4].outputTarget = "";
        problemList[4].reward = 0;
        problemList[4].expiry = 0;

        // Hardcoded details for Problem index 5 (problem ID, IPFS hash, input variables to change, output variable
        // to optimise, output variable target value, reward value, and problem expiry date)
        problemIndex["56199909d0b5fd"] = 5; // Replace with actual ID
        problemList[5].id = "56199909d0b5fd"; // Replace with actual ID
        problemList[5].ipfsHash = "QmVL6TXZoU6ggen8zsTeyCeP5y7VofngrG1Mogr12dv4jA"; // Replace with actual IPFS hash
        problemList[5].inputs = "";
        problemList[5].output = "";
        problemList[5].outputTarget = "";
        problemList[5].reward = 0;
        problemList[5].expiry = 0;
    }

    /// @dev Fallback function
    function () external payable {
    }

    /// @dev The owner can add ETH to the contract when the contract is not paused
    function addBalance()
        public
        payable
        onlyOwner
        whenNotPaused {
        emit balanceNowUpdated(address(this).balance);
    }

    /// @dev The owner can withdraw ETH from the contract when the contract is not paused
    /// @param amount Value to be withdrawn in wei
    function withdrawBalance (uint256 amount)
        public
        onlyOwner
        whenNotPaused {
        msg.sender.transfer(amount);
        emit balanceNowUpdated(address(this).balance);
    }

    /// @dev Register problems with a particular index number and IPFS hash
    /// @param _problemIndex Desired Problem Index - will overwrite previous problem registered to that index if existing
    ///     An index of 0 will create a new problem and increment the total problem count
    /// @param _problemId Problem ID code
    /// @param _ipfsHash IPFS hash associated with the problem (could be a hash of a picture of the problem location)
    /// @param _inputs Input variables of the problem for user to change
    /// @param _output Output variable to optimise
    /// @param _outputTarget Target value for the output variable
    /// @param _reward Value of reward for finding input variable values that result in an output variable above the target
    /// @param _expiry Expiry time of problem

    function registerProblem(
        uint32 _problemIndex,
        string memory _problemId,
        string memory _ipfsHash,
        string memory _inputs,
        string memory _output,
        string memory _outputTarget,
        uint _reward,
        uint _expiry)
        public
        onlyOwner
        returns (bool)
        {
        require(_problemIndex <= totalProblems, "Problem index cannot be greater than the current number of problems");
        uint32 newProblemIndex;
        if (_problemIndex == 0) {
            totalProblems++;
            newProblemIndex = totalProblems;
            problemIndex[_problemId] = newProblemIndex;
        }
        else {
            newProblemIndex = _problemIndex;
        }

        problemList[newProblemIndex].id = _problemId;
        problemList[newProblemIndex].ipfsHash = _ipfsHash;
        problemList[newProblemIndex].inputs = _inputs;
        problemList[newProblemIndex].output = _output;
        problemList[newProblemIndex].outputTarget = _outputTarget;
        problemList[newProblemIndex].reward = _reward;
        problemList[newProblemIndex].expiry = _expiry;

        emit problemNowRegistered(_problemIndex, _problemId, _ipfsHash, _inputs, _output, _outputTarget, _reward, _expiry);
        return true;
    }

    /// @dev Register users with a unique index number and associated username
    /// @param _userAddress User's ID code
    /// @param _username User's username
    function registerUser(
        address _userAddress,
        string memory _username,
        address _payoutAddress)
        public
        returns (bool)
        {
        require(userIndex[msg.sender] == 0, "User already registered");
        totalUsers++;
        userIndex[_userAddress] = totalUsers;

        userList[userIndex[_userAddress]].userAddress = _userAddress;
        userList[userIndex[_userAddress]].username = _username;
        userList[userIndex[_userAddress]].payoutAddress = _payoutAddress;

        emit userNowRegistered(_userAddress, _username, _payoutAddress);
        return true;
    }

    /// @dev Updates a user
    /// @param _userAddress User's ID code
    function updateUser(
        address _userAddress,
        string memory _username,
        address _payoutAddress)
        public
        returns (bool)
        {
        require(userList[userIndex[msg.sender]].userAddress == _userAddress, "Not correct user.");

        userList[userIndex[_userAddress]].username = _username;
        userList[userIndex[_userAddress]].payoutAddress = _payoutAddress;

        emit userNowUpdated(_userAddress, _username, _payoutAddress);
        return true;
    }

    /// @dev Record the solving of problems
    /// @param _userAddress User's ID code
    /// @param _username User's username
    /// @param _problemId Problem ID code
    function submitSolution(
        address _userAddress,
        string memory _problemId)
        public
        returns (bool)
        {
        require(userIndex[_userAddress] > 0, "User not registered"); // User must be registered to submit a solution

        totalSolutions++;

        solutionList[totalSolutions].userAddress = _userAddress;
        solutionList[totalSolutions].problemId = _problemId;
        solutionList[totalSolutions].timestamp = block.timestamp;

        emit problemNowSolved(_userAddress, _problemId, block.timestamp);
        return true;
    }

    /// @dev Returns the current total number of problems registered
    /// @param _totalProblems Current total number of problems registered
    function getTotalProblems()
        public
        view
        returns (uint32 _totalProblems)
        {
        _totalProblems = totalProblems;
    }

    /// @dev Returns the current total number of users registered
    /// @param _totalUsers Current total number of users registered
    function getTotalUsers()
        public
        view
        returns (uint32 _totalUsers)
        {
        _totalUsers = totalUsers;
    }

    /// @dev Returns the current total number of solutions
    /// @param _totalSolutions Current total number of solutions
    function getTotalSolutions()
        public
        view
        returns (uint32 _totalSolutions)
        {
        _totalSolutions = totalSolutions;
    }

    /// @dev Returns the requested user data by index
    function getUser(address _userAddress)
        public
        view
        returns (
        string memory _username,
        address _payoutAddress)
        {
        _username = userList[userIndex[_userAddress]].username;
        _payoutAddress = userList[userIndex[_userAddress]].payoutAddress;
    }

    /// @dev Returns the requested problem data by index
    function getProblem(uint32 _problemIndex)
        public
        view
        returns (
        string memory _id,
        string memory _ipfsHash,
        string memory _inputs,
        string memory _output,
        string memory _outputTarget,
        uint _reward,
        uint _expiry)
        {
        _id = problemList[_problemIndex].id;
        _ipfsHash = problemList[_problemIndex].ipfsHash;
        _inputs = problemList[_problemIndex].inputs;
        _output = problemList[_problemIndex].output;
        _outputTarget = problemList[_problemIndex].outputTarget;
        _reward = problemList[_problemIndex].reward;
        _expiry = problemList[_problemIndex].expiry;
    }

    /// @dev Returns the requested solution data by index
    function getSolution(uint32 _solutionIndex)
        public
        view
        returns (
        address _userAddress,
        string memory _problemId,
        uint _timestamp)
        {
        _userAddress = solutionList[_solutionIndex].userAddress;
        _problemId = solutionList[_solutionIndex].problemId;
        _timestamp = solutionList[_solutionIndex].timestamp;
    }

}
