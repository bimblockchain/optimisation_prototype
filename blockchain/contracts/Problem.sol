pragma solidity ^0.5.0;

import "openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "./IpfsHashHolder.sol";

/// @title A contract representing a BIM Problem being represented on the Blockchain
/// @author Andy Watt & Colin McCrae
contract Problem is IpfsHashHolder, Ownable
{
    uint public problemId;
    ProblemState public currentState;
    address private winner;
    address[] private solutions;

    /// @notice Depolys an instance of the Problem contract
    /// @dev Stores the Problem id for this contract and sets the state to initialised
    constructor (uint _problemId) public payable
    {
        problemId = _problemId;
        currentState = ProblemState.Initialised; // Contract starts in 'Initialised' state
    }

        /// @notice An envent indicating that the contract state has been set to Opened
    event problemOpened();

    /// @notice An envent indicating that the contract state has been set to Solved
    event problemSolved();

    /// @notice An envent indicating that the contract state has been set to Completed
    event problemCompleted();

    /// @notice An envent indicating that the contract state has been set to Cancelled
    event problemCancelled();

    /// @notice An enumeration of the possible contract states
    enum ProblemState { Initialised, Opened, Solved, Completed, Cancelled }

    /// @notice Modifier to check the currentState against a required state
    modifier checkState(ProblemState requiredState)
    {
        require(currentState == requiredState, "Contract is not in the correct state");
        _;
    }

    /// @notice Modifier to check that the IPFS has with the problem specification is not null
    modifier hasIpfsHash()
    {
        bytes memory textRepresentation = bytes(ipfsHash);
        require (textRepresentation.length > 0, "IPFS has is required");
        _;
    }

    /// @notice Moves a draft problem to 'Opened' and ready to accept bids
    /// @dev sets the enum to ProblemState.Opened
    function openProblem()
        public
        hasIpfsHash()
        checkState(ProblemState.Initialised)
        returns(ProblemState)
    {
        currentState = ProblemState.Opened;
        emit problemOpened();
        return currentState;
    }

    /// @notice Returns a boolean indicating is the Problem is Opened
    /// @dev A work-around because handling enumerations in the UI is challenging
    function problemIsOpen()
        public
        view
        returns (bool)
    {
        return currentState == ProblemState.Opened;
    }

    /// @notice Moves an opened problem to Solved, a winner has been selected
    /// @dev sets the enum to ProblemState.Solved, and stores the winning address
    /// @param _winner the address of the winning bid
    function solveProblem(address _winner)
        public
        checkState(ProblemState.Opened)
        returns(ProblemState)
    {
        winner = _winner;
        currentState = ProblemState.Solved;
        emit problemSolved();
        return currentState;
    }

    /// @notice Returns a boolean indicating is the Problem is Solved
    /// @dev A work-around because handling enulerations in the UI is challenging
    function problemIsSolved()
        public
        view
        returns (bool)
    {
        return currentState == ProblemState.Solved;
    }

    /// @notice Moves an Awarded contract to completed
    /// @dev sets the enum to ProblemState.Completed
    function completedProblem()
        public
        checkState(ProblemState.Solved)
        returns(ProblemState)
    {
        currentState = ProblemState.Completed;
        emit problemCompleted();
        return currentState;
    }

    /// @notice Returns a boolean indicating is the Problem is Completed
    /// @dev A work-around because handling enulerations in the UI is challenging
    function problemIsCompleted()
        public
        view
        returns (bool)
    {
        return currentState == ProblemState.Completed;
    }

        /// @notice Cancels a contract, from any state
    /// @dev sets the enum to ProblemState.Cancelled, and does the required clean up
    function cancelProblem()
        public
        returns(ProblemState)
    {
        currentState = ProblemState.Cancelled;
        emit problemCancelled();
        return currentState;
    }

    /// @notice Returns a boolean indicating is the Problem is Cancelled
    /// @dev A work-around because handling enulerations in the UI is challenging
    function problemIsCancelled()
        public
        view
        returns (bool)
    {
        return currentState == ProblemState.Cancelled;
    }

    /// @notice function called by a problem solver to notify the problem owner of their propsal
    function proposeSolution(address solutionAddress)
        public
        checkState(ProblemState.Opened)
        returns (bool)
    {
        solutions.push(solutionAddress);
    }

}

