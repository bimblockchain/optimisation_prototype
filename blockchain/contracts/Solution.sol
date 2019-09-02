pragma solidity ^0.5.0;

import "./IpfsHashHolder.sol";
import "./Problem.sol";

// @title A contract representing a solution to a BIM Problem being represented on the Blockchain
// @author Andy Watt & Colin McCrae
contract Solution is IpfsHashHolder
{
    uint public currentOptimisedValue;
    uint public solutionId;
    SolutionState public currentState;
    Problem public associatedProblem;

    // @notice Depolys an instance of the Solution contract
    // @dev Stores the Solution id for this contract and sets the state to initialised
    constructor(address associatedProblemAddress, uint _solutionId) public
    {
        associatedProblem = Problem(associatedProblemAddress);
        associatedProblem.attachSolution(address(this));
        solutionId = _solutionId;
        currentState = SolutionState.Initialised; // Contract starts in 'Initialised' state
    }

    // @notice An envent indicating that the contract state has been set to Opened
    event solutionOpened();

    // @notice An envent indicating that the contract state has been set to Accepted
    event solutionAccepted();

    // @notice An envent indicating that the contract state has been set to Rejected
    event solutionRejected();

    // @notice An envent indicating that the contract state has been set to Completed
    event solutionCompleted();

    // @notice An envent indicating that the contract state has been set to Cancelled
    event solutionCancelled();

    // @notice An enumeration of the possible contract states
    enum SolutionState { Initialised, Opened, Accepted, Rejected, Completed, Cancelled }

    // @notice Modifier to check the the caller is the owner of the associated problem contract
    modifier onlyProblemOwner()
    {
        require(msg.sender == associatedProblem.problemOwner(), "Caller is not associated Problem Owner");
        _;
    }

    // @notice Modifier to check the currentState against a required state
    modifier checkState(SolutionState requiredState)
    {
        require(currentState == requiredState, "Contract is not in the correct state");
        _;
    }

    // @notice Modifier to check that the IPFS has with the solution specification is not null
    modifier hasIpfsHash()
    {
        bytes memory textRepresentation = bytes(ipfsHash);
        require (textRepresentation.length > 0, "IPFS has is required");
        _;
    }

    // @notice Returns the ipsf hash from the attached problem
    function getAssociatedProblemIpfsHash()
        public
        view
        returns (string memory)
        {
            return associatedProblem.ipfsHash();
        }

    // @notice Accepts the optimised value
    // @dev Accepts the optimised value
    function sendValue(uint optimisedValue)
        public
        returns (bool)
    {
        currentOptimisedValue = optimisedValue;
        return true;
    }

    // @notice Moves a draft solution to 'Opened'
    // @dev sets the enum to SolutionState.Opened
    function openSolution()
        public
        hasIpfsHash()
        checkState(SolutionState.Initialised)
        returns(SolutionState)
    {
        currentState = SolutionState.Opened;
        emit solutionOpened();
        return currentState;
    }

    // @notice Returns a boolean indicating is the solution is Opened
    // @dev A work-around because handling enumerations in the UI is challenging
    function solutionIsOpen()
        public
        view
        returns (bool)
    {
        return currentState == SolutionState.Opened;
    }

    // @notice Moves an opened solution to Accepted, when it is selected as a winnner
    // @dev sets the enum to SolutionState.Accepted
    function acceptSolution()
        public
        onlyProblemOwner
        checkState(SolutionState.Opened)
        returns(SolutionState)
    {
        currentState = SolutionState.Accepted;
        emit solutionAccepted();
        return currentState;
    }

    // @notice Moves an opened solution to Rejected, when it is not selected as a winnner
    // @dev sets the enum to SolutionState.Rejected
    function rejectSolution()
        public
        onlyProblemOwner
        checkState(SolutionState.Opened)
        returns(SolutionState)
    {
        currentState = SolutionState.Rejected;
        emit solutionRejected();
        return currentState;
    }

    // @notice Moves an Accepted solution to Completed
    // @dev sets the enum to SolutionState.Completed
    function completedSolution()
        public
        checkState(SolutionState.Accepted)
        returns(SolutionState)
    {
        currentState = SolutionState.Completed;
        emit solutionCompleted();
        return currentState;
    }

    // @notice Returns a boolean indicating if the solution is Completed
    // @dev A work-around because handling enulerations in the UI is challenging
    function solutionIsCompleted()
        public
        view
        returns (bool)
    {
        return currentState == SolutionState.Completed;
    }

        // @notice Cancels a solution, from any state
    // @dev sets the enum to SolutionState.Cancelled, and does the required clean up
    function cancelSolution()
        public
        returns(SolutionState)
    {
        currentState = SolutionState.Cancelled;
        emit solutionCancelled();
        return currentState;
    }

    // @notice Returns a boolean indicating is the solution is Cancelled
    // @dev A work-around because handling enulerations in the UI is challenging
    function solutionIsCancelled()
        public
        view
        returns (bool)
    {
        return currentState == SolutionState.Cancelled;
    }

}

