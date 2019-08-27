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
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="3" />
        </div>
        <p> This UI is a very simple reference implementation that allows BIM Manager System to be tested. </p>
        <br />
        <table border="2">
            <tbody>
            <tr>
                <td>
                    Register as Problem Owner
                </td>
                <td>
                    Unegister as Problem Owner
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
        <table border="2">
        <tbody>
            <tr>
                <td>
                    Register as Problem Optimiser
                </td>
                <td>
                    Unegister as Problem OwnOptimiserer
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
                        Initiate an optimisation problem
                    </td>
                    <td>
                    <ContractForm
                        contract="BIMManager"
                        method="createProblem"/>
                    </td>
                </tr>
                <tr>
                <td>
                    Problem Contract Address:
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
        <br />

    </div>
);
