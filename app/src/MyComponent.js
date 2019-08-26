import React from "react";
import {
    AccountData,
    ContractData,
    ContractForm,
} from "drizzle-react-components";
import IpfsForm from "./IpfsForm"

import logo from "./logo.png";

export default ({ accounts }) => (
    <div className="App">
        <div className="section">
            <h2>Active Account</h2>
            <AccountData accountIndex="0" units="ether" precision="3" />
        </div>
        <p> This UI is a very simple reference implementation that allows the full life cycle of a tender to be assessed. This is simply intended to demonstrate how the contract interactions work, this is not a complete UI for this tendering system. </p>
        <br />
        <table border="1">
            <tbody>
            <tr>
                <td>
                    Register as Client
                </td>
                <td>
                    Unegister as Client
                </td>
                <td>
                    Is Registered Client
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
                        method="unregisterProblemOwnert"
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
    </div>
);
