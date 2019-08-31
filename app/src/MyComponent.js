import React from "react";
import {
    AccountData,
    ContractData,
    ContractForm,
} from "drizzle-react-components";
import IpfsForm from "./IpfsForm";
import ProblemOwnerForm from "./ProblemOwnerForm";
import { Button, Container, Row, Col } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";

export default ({ accounts }) => (
    <div>
        <div className="jumbotron text-center">
            <h1>BIM Blockchain Prototype</h1>
            <p>Example integration Between Grasshoopper and the Ethereum Blockchain</p>
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
                    <p>Lorem ipsum dolor..</p>
                </div>
            </div>
            <div className="row">
                <div className="col-sm-6">
                    <h3>Problem Optimiser Details</h3>
                    <p>sdasdasdasd..</p>
                </div>
                <div className="col-sm-6">
                    <h3>Selected Solution Details</h3>
                    <p>asdasdasdsd..</p>
                </div>
            </div>
        </div>
    </div>
);





