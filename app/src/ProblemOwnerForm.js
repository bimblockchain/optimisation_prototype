import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {
    AccountData,
    ContractData,
    ContractForm,
} from "drizzle-react-components";
import { Button, Container, Row, Col } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";

class ProblemOwnerForm extends Component{
    constructor(props, context) {
        super(props)
        this.contracts = context.drizzle.contracts
        this.state = {
            getTotalProblemsIndex: this.contracts.BIMManager.methods.getTotalProblems.cacheCall(),
            registeredProblemOwnersIndex: this.contracts.BIMManager.methods.registeredProblemOwners.cacheCall(...[this.props.accounts[0]]),
        };
        //this.onIPFSSubmit = this.onIPFSSubmit.bind(this);
    }

    getNumberOfProblems = () => {
        return this.props.contracts.BIMManager.getTotalProblems[this.state.getTotalProblemsIndex].value;
    };

    addressIsRegistered = () => {
        console.log(this.state.registeredProblemOwnersIndex);
        console.log(this.props.contracts.BIMManager.registeredProblemOwners);
        return this.props.contracts.BIMManager.registeredProblemOwners[this.state.registeredProblemOwnersIndex].value;
    };

    AddressIsRegistered = () => {
        return (
        <div className="container">
            <div className="row">
                <div className="col-sm-3">><p>Address is registered</p></div>
                <div className="col-sm-3">
                <ContractForm
                    contract="BIMManager"
                    method="unregisterProblemOwner"
                    labels={["Unregister as Problem Owner"]}/>
                </div>
            </div>
        </div>
        );
    };

    AddressIsNotRegistered = () => {
        return (
            <div>
                <p>Address is not registered</p>
                <ContractForm
                        contract="BIMManager"
                        method="registerProblemOwner"
                        labels={["Register as ProblemOwner"]}/>
            </div>
            );
    };

    render() {
        if (
            !(this.state.getTotalProblemsIndex in this.props.contracts.BIMManager.getTotalProblems &&
                this.state.registeredProblemOwnersIndex in this.props.contracts.BIMManager.registeredProblemOwners
            )
        ) { return <span>Fetching...</span>; }

        var registeredStatus = this.AddressIsNotRegistered();
        if(this.addressIsRegistered())
        {
            registeredStatus = this.AddressIsRegistered();
        }

        return (
            <div className="app">
                <Button variant="primary">Primary</Button>
                <p>{registeredStatus}</p>
            </div>
        )
    }
}

ProblemOwnerForm.contextTypes = {
    drizzle: PropTypes.object
}

    /*
   * Export connected component.
   */

const mapStateToProps = state => {
    return {
        contracts: state.contracts
    }
}

export default drizzleConnect(ProblemOwnerForm, mapStateToProps)