import React from "react";
import {
    AccountData,
    ContractData,
    ContractForm,
} from "drizzle-react-components";
import IpfsForm from "./IpfsForm";


export default ({ accounts }) => (
    <div className="App">
        <div className="section">
        <h2> BIM Blockchain Manager </h2>
        <p> This UI is a simple reference implementation that allows the BIM Blockchain Manager to be tested. </p>
        </div>
        <br />

        <p> <b> Active Account Address and Balance: <AccountData accountIndex="0" units="ether" precision="3" /> </b> </p>
        <br />

        <p LEFT> <b> Submit Problem </b> (Problem Owner's workflow) </p>

        <table border="2">
            <tbody>
            <tr>
                <td>
                    Refresh
                </td>
                <td>
                    Number of Problems Submitted
                </td>
            </tr>
            <tr>
                <td>
                    <ContractForm
                        contract="BIMManager"
                        method="getTotalProblems"/>
                </td>
                <td>
                    <ContractData
                        contract="BIMManager"
                        method="getTotalProblems"/>
                </td>
            </tr>
            </tbody>
        </table>
        <br />

        <table border="1">
            <tbody>
                <tr>
                    <td>
                        Enter Address to Find Problem ID
                    </td>
                    <td>
                    <ContractForm
                        contract="BIMManager"
                        method="problemOwnerProblemIds"
                        labels={["Address"]}/>
                    </td>
                </tr>
                <tr>
                <td>
                    Associated Problem ID
                </td>
                <td>
                    <ContractData
                    contract="BIMManager"
                    method="problemOwnerProblemIds"
                    methodArgs={[accounts[0]]}/>
                </td>
            </tr>
            </tbody>
        </table>
        <br />

        <table border="2">
            <tbody>
            <tr>
                <td>
                    Register as Problem Owner
                </td>
                <td>
                    Unregister as Problem Owner
                </td>
                <td>
                    Is Registered Problem Owner
                </td>
            </tr>
            <tr>
                <td>
                    <ContractForm
                        contract="BIMManager"
                        method="registerProblemOwner"
                        labels={["Register as ProblemOwner"]}/>
                </td>
                <td>
                    <ContractForm
                        contract="BIMManager"
                        method="unregisterProblemOwner"
                        labels={["Unregister as ProblemOwner"]}/>
                </td>
                <td>
                    <ContractData
                        contract="BIMManager"
                        method="registeredProblemOwners"
                        methodArgs={[accounts[0]]}
                        labels={["Check Registered"]}/>
                </td>
            </tr>
            </tbody>
        </table>
        <br />

        <table border="1">
            <tbody>
                <tr>
                    <td>
                        Initiate an Optimisation Problem
                    </td>
                    <td>
                    <ContractForm
                        contract="BIMManager"
                        method="createProblem"/>
                    </td>
                </tr>
                <tr>
                    <td>
                    Latest Problem Contract Address:
                    </td>
                    <td>
                    <ContractData
                    contract="BIMManager"
                    method="problemIdAddresses"
                    methodArgs={[1]}/>
                    </td>
                </tr>
                </tbody>
        </table>
        <br />

        <table border="1">
            <tbody>
                <tr>
                    <td>
                    Problem 1 Contract Address:
                    </td>
                    <td>
                    <ContractData
                    contract="BIMManager"
                    method="problemIdAddresses"
                    methodArgs={[1]}/>
                    </td>
                </tr>
                <tr>
                    <td>
                    Problem 2 Contract Address:
                    </td>
                    <td>
                    <ContractData
                    contract="BIMManager"
                    method="problemIdAddresses"
                    methodArgs={[2]}/>
                    </td>
                </tr>
                <tr>
                    <td>
                    Problem 3 Contract Address:
                    </td>
                    <td>
                    <ContractData
                    contract="BIMManager"
                    method="problemIdAddresses"
                    methodArgs={[3]}/>
                    </td>
                </tr>
                <tr>
                    <td>
                    Problem 4 Contract Address:
                    </td>
                    <td>
                    <ContractData
                    contract="BIMManager"
                    method="problemIdAddresses"
                    methodArgs={[4]}/>
                    </td>
                </tr>
                <tr>
                    <td>
                    Problem 5 Contract Address:
                    </td>
                    <td>
                    <ContractData
                    contract="BIMManager"
                    method="problemIdAddresses"
                    methodArgs={[5]}/>
                    </td>
                </tr>
            </tbody>
        </table>
        <br />

        <table border="2">
            <tbody>
            <tr>
                <td>
                    Send problem file to IPFS:
                </td>
                <td>
                    <IpfsForm />
                </td>
            </tr>
            <tr>
                <td>
                    IPFS Send hash to Problem contract:
                </td>
                <td>
                    <p>Paste in the values from above</p>
                    <ContractForm
                        contract="BIMManager"
                        method="associateIPFS"
                        labels={["IPFS Hash", "Problem Address"]}/>
                </td>
            </tr>
            </tbody>
        </table>
        <br /> <br />

        {/* <table border="2">
            <tbody>
            <tr>
                <td>
                    Open Problem (once initialised)
                </td>
                <td>
                    Is Problem Opened
                </td>
            </tr>
            <tr>
                <td>
                    <ContractForm
                        contract="Problem"
                        method="openProblem"
                        labels={["Open Problem (once initialised)"]}/>
                </td>
                <td>
                    <ContractData
                        contract="Problem"
                        method="problemIsOpen"
                        methodArgs={[]}
                        labels={["Is Problem Opened"]}/>
                </td>
            </tr>
            </tbody>
        </table>
        <br /> */}







        <p LEFT> <b> Submit Solution </b> (Problem Optimiser's workflow) </p>

        <table border="2">
            <tbody>
            <tr>
                <td>
                    Refresh
                </td>
                <td>
                    Number of Solutions Submitted
                </td>
            </tr>
            <tr>
                <td>
                    <ContractForm
                        contract="BIMManager"
                        method="getTotalSolutions"/>
                </td>
                <td>
                    <ContractData
                        contract="BIMManager"
                        method="getTotalSolutions"/>
                </td>
            </tr>
            </tbody>
        </table>
        <br />

        <table border="1">
            <tbody>
                <tr>
                    <td>
                        Enter Address to Find Solution ID
                    </td>
                    <td>
                    <ContractForm
                        contract="BIMManager"
                        method="problemOptimiserSolutionIds"
                        labels={["Address"]}/>
                    </td>
                </tr>
                <tr>
                <td>
                    Associated Solution ID
                </td>
                <td>
                    <ContractData
                    contract="BIMManager"
                    method="problemOptimiserSolutionIds"
                    methodArgs={[accounts[0]]}/>
                </td>
            </tr>
            </tbody>
        </table>
        <br />

        <table border="2">
        <tbody>
            <tr>
                <td>
                    Register as Problem Optimiser
                </td>
                <td>
                    Unregister as Problem Optimiser
                </td>
                <td>
                    Is Registered Problem Optimiser
                </td>
            </tr>
            <tr>
                <td>
                    <ContractForm
                        contract="BIMManager"
                        method="registerProblemOptimiser"
                        labels={["Register as Problem Optimiser"]}/>
                </td>
                <td>
                    <ContractForm
                        contract="BIMManager"
                        method="unregisterProblemOptimiser"
                        labels={["Unregister as ProblemOptimiser"]}/>
                </td>
                <td>
                    <ContractData
                        contract="BIMManager"
                        method="registeredProblemOptimisers"
                        methodArgs={[accounts[0]]}
                        labels={["Check Registered"]}/>
                </td>
            </tr>
            </tbody>
        </table>
        <br />

        <table border="1">
            <tbody>
                <tr>
                    <td>
                        Initiate an Optimisation Solution
                    </td>
                    <td>
                    <ContractForm
                        contract="BIMManager"
                        method="createSolution"
                        labels={["Associated Problem ID"]}
                        methodArgs={[1]}/>
                    </td>
                </tr>
                <tr>
                <td>
                    Latest Solution Contract Address:
                </td>
                <td>
                    <ContractData
                    contract="BIMManager"
                    method="solutionIdAddresses"
                    methodArgs={[1]}/>
                </td>
            </tr>
            </tbody>
        </table>
        <br />

        <table border="1">
            <tbody>
            <tr>
                <td>
                    Solution 1 Contract Address:
                </td>
                <td>
                    <ContractData
                    contract="BIMManager"
                    method="solutionIdAddresses"
                    methodArgs={[1]}/>
                </td>
            </tr>
            <tr>
                <td>
                    Solution 2 Contract Address:
                </td>
                <td>
                    <ContractData
                    contract="BIMManager"
                    method="solutionIdAddresses"
                    methodArgs={[2]}/>
                </td>
            </tr>
            <tr>
                <td>
                    Solution 3 Contract Address:
                </td>
                <td>
                    <ContractData
                    contract="BIMManager"
                    method="solutionIdAddresses"
                    methodArgs={[3]}/>
                </td>
            </tr>
            <tr>
                <td>
                    Solution 4 Contract Address:
                </td>
                <td>
                    <ContractData
                    contract="BIMManager"
                    method="solutionIdAddresses"
                    methodArgs={[4]}/>
                </td>
            </tr>
            <tr>
                <td>
                    Solution 5 Contract Address:
                </td>
                <td>
                    <ContractData
                    contract="BIMManager"
                    method="solutionIdAddresses"
                    methodArgs={[5]}/>
                </td>
            </tr>
            </tbody>
        </table>
        <br /> <br />





        {/* <table border="2">
        <tbody>
            <tr>
                <td>
                    Submit a Solution
                </td>
                <td>
                    Is Solution Submitted
                </td>
            </tr>
            <tr>
                <td>
                    <ContractForm
                        contract="Problem"
                        method="attachSolution"
                        labels={["Address of Solution"]}/>
                </td>
                <td>
                    <ContractData
                        contract="Problem"
                        method="solutions"/>
                </td>
            </tr>
            </tbody>
        </table>
        <br /> */}


        {/* <table border="2">
            <tbody>
            <tr>
                <td>
                    Open Solution (once initialised)
                </td>
                <td>
                    Is Solution Opened
                </td>
            </tr>
            <tr>
                <td>
                    <ContractForm
                        contract="Solution"
                        method="openSolution"
                        labels={["Open Solution (once initialised)"]}/>
                </td>
                <td>
                    <ContractData
                        contract="Solution"
                        method="solutionIsOpen"
                        methodArgs={[]}
                        labels={["Is Solution Opened"]}/>
                </td>
            </tr>
            </tbody>
        </table>
        <br /> */}


        {/* <table border="2">
            <tbody>
            <tr>
                <td>
                    Send Optimised Value
                </td>
                <td>
                    Is Value Sent
                </td>
            </tr>
            <tr>
                <td>
                    <ContractForm
                        contract="Solution"
                        method="sendValue"
                        labels={["Optimised Value"]}/>
                </td>
                <td>
                    <ContractData
                        contract="Solution"
                        method="sendValue"
                        methodArgs={[]}
                        labels={[""Optimised Value"]}/>
                </td>
            </tr>
            </tbody>
        </table>
        <br /> */}







        {/* <table border="2">
            <tbody>
            <tr>
                <td>
                    Complete Solution (once accepted)
                </td>
                <td>
                    Is Solution Completed
                </td>
            </tr>
            <tr>
                <td>
                    <ContractForm
                        contract="Solution"
                        method="completedSolution"
                        labels={["Complete Solution (once accepted)"]}/>
                </td>
                <td>
                    <ContractData
                        contract="Solution"
                        method="solutionIsCompleted"
                        methodArgs={[]}
                        labels={["Is Solution Completed"]}/>
                </td>
            </tr>
            </tbody>
        </table>
        <br /> */}


        {/* <table border="2">
            <tbody>
            <tr>
                <td>
                    Cancel Solution
                </td>
                <td>
                    Is Solution Cancelled
                </td>
            </tr>
            <tr>
                <td>
                    <ContractForm
                        contract="Solution"
                        method="cancelSolution"
                        labels={["Cancel Solution"]}/>
                </td>
                <td>
                    <ContractData
                        contract="Solution"
                        method="solutionIsCancelled"
                        methodArgs={[]}
                        labels={["Is Solution Cancelled"]}/>
                </td>
            </tr>
            </tbody>
        </table>
        <br /> */}


        <p LEFT> <b> Problem Award and Admin </b> (Problem Owner's workflow) </p>

        {/* <table border="2">
            <tbody>
            <tr>
                <td>
                    Solve Problem (when open)
                </td>
                <td>
                    Is Problem Solved
                </td>
            </tr>
            <tr>
                <td>
                    <ContractForm
                        contract="Problem"
                        method="solveProblem"
                        methodArgs={[account[0]]}
                        labels={["Solve Problem (when open)"]}/>
                </td>
                <td>
                    <ContractData
                        contract="Problem"
                        method="problemIsSolved"
                        methodArgs={[]}
                        labels={["Is Problem Solved"]}/>
                </td>
            </tr>
            </tbody>
        </table>
        <br /> */}

        {/* <table border="2">
            <tbody>
            <tr>
                <td>
                    Complete Problem (when solved)
                </td>
                <td>
                    Is Problem Complete
                </td>
            </tr>
            <tr>
                <td>
                    <ContractForm
                        contract="Problem"
                        method="completedProblem"
                        labels={["Complete Problem (when solved)"]}/>
                </td>
                <td>
                    <ContractData
                        contract="Problem"
                        method="problemIsCompleted"
                        methodArgs={[]}
                        labels={["Is Problem Complete"]}/>
                </td>
            </tr>
            </tbody>
        </table>
        <br /> */}

        {/* <table border="2">
            <tbody>
            <tr>
                <td>
                    Cancel Problem
                </td>
                <td>
                    Is Problem Cancelled
                </td>
            </tr>
            <tr>
                <td>
                    <ContractForm
                        contract="Problem"
                        method="cancelProblem"
                        labels={["Cancel Problem"]}/>
                </td>
                <td>
                    <ContractData
                        contract="Problem"
                        method="problemIsCancelled"
                        methodArgs={[]}
                        labels={["Is Problem Cancelled"]}/>
                </td>
            </tr>
            </tbody>
        </table>
        <br /> */}


    </div>
);





