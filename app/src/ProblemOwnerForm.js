import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { ContractData, ContractForm,} from "drizzle-react-components";
import { Container, Row, Col } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import BetterContractForm from "./BetterContractForm";

import problemContractArtifacts from './contracts/Problem.json';
//const web3 = new W3(new W3.providers.HttpProvider('https://localhost:7545'));

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
        return this.props.contracts.BIMManager.registeredProblemOwners[this.state.registeredProblemOwnersIndex].value;
    };

    AddressIsRegistered = () => {
        return (
        <div>
            <Container>
                <Row>
                    <Col><p>Address is registered</p></Col>
                    <Col>
                        <BetterContractForm
                            contract="BIMManager"
                            method="unregisterProblemOwner"
                            submitText="Un-Register"
                            buttonClassName = "btn btn-warning btn-block"/>
                    </Col>
                </Row>
            </Container>
        </div>
        );
    };

    AddressIsNotRegistered = () => {
        return (
            <Container>
                <Row>
                    <Col><p>Address is not registered</p></Col>
                    <Col>
                        <BetterContractForm
                            contract="BIMManager"
                            method="registerProblemOwner"
                            submitText="Register"
                            buttonClassName = "btn btn-success btn-block"/>
                    </Col>
                </Row>
            </Container>
            );
    };

    CreateNewProblem = () => {
        return (
            <Container>
                <Row>
                    <Col>
                        Create a New Problem
                    </Col>
                    <Col>
                    <BetterContractForm
                        contract="BIMManager"
                        method="createProblem"
                        submitText="Create"
                        buttonClassName = "btn btn-primary btn-block"/>
                    </Col>
                </Row>
            </Container>
        );
    };

    LatestProblemAddress = () => {
        return (
            <Container>
                <Row>
                    <Col>
                        Latest Problem Address
                    </Col>
                    <Col>
                        <div className="badge badge-primary text-wrap">
                        <ContractData
                            contract="BIMManager"
                            method="problemIdAddresses"
                            methodArgs={[1]}/>
                        </div>
                    </Col>
                </Row>
            </Container>
        );
    };

    Template = () => {
        return (
            <Container>
                <Row>
                    <Col>
                    </Col>
                    <Col>
                    </Col>
                </Row>
            </Container>
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

        var createNew = this.addressIsRegistered() ? this.CreateNewProblem() : <p>Register Address to add new Problem</p>

        return (
            <div className="app">
                {registeredStatus}
                {createNew}
                {/* {this.addressIsRegistered() ? this.LatestProblemAddress() : ''} */}
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