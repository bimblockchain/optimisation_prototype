import React from "react";
import {
    AccountData,
} from "drizzle-react-components";
import ProblemOwnerForm from "./ProblemOwnerForm";
import ProblemOptimiserForm from "./ProblemOptimiserForm";
import SelectedProblemForm from "./SelectedProblemForm";
import SelectedSolutionForm from "./SelectedSolutionForm";
import "bootstrap/dist/css/bootstrap.css";

export default ({ accounts }) => (
    <div>
        <div className="jumbotron text-center">
            <h1>BIM Blockchain Prototype</h1>
            <p>Example integration between Grasshoopper and the Ethereum Blockchain</p>
        </div>

        <div className="container">
            <div className="row">
                <div className="col-sm-3">
                    Account Details:
                </div>
                <div className="col-sm-9">
                    <AccountData accountIndex={0} units="ether" precision={3} />
                </div>
            </div>
            <hr />

            <div className="row">
                <div className="col-sm-6">
                    <h3>Problem Owner Details</h3>
                    <ProblemOwnerForm accounts = {accounts}/>
                </div>
                <div className="col-sm-6">
                    <h3>Selected Problem Details</h3>
                    <SelectedProblemForm accounts = {accounts}/>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <h3>Problem Optimiser Details</h3>
                    <ProblemOptimiserForm accounts = {accounts}/>
                </div>
                <div className="col-sm-6">
                    <h3>Selected Solution Details</h3>
                    <SelectedSolutionForm accounts = {accounts}/>
                </div>
            </div>
        </div>
    </div>
);





