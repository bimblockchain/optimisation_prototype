import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
//import W3 from 'web3';
import {
    AccountData,
    ContractData,
    ContractForm,
} from "drizzle-react-components";
import { Container, Row, Col } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import BetterContractForm from "./BetterContractForm";
import IpfsForm from "./IpfsForm";

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
                        <ContractData
                            contract="BIMManager"
                            method="problemIdAddresses"
                            methodArgs={[1]}/>
                    </Col>
                </Row>
            </Container>
        );
    };

    GetProblemContractDetails = () => {
        return (
            <Container>
                <Row>
                    <Col>
                        Deets
                    </Col>
                    <Col>
                        <ContractData
                            contract="Problem"
                            method="currentState"/>
                    </Col>
                    <Col>
                    <ContractForm
                            contract="Problem"
                            method="openProblem"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <ContractData
                            contract="Problem"
                            method="ipfsHash"/>
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

    LoadProblemContract = async () => {
        console.log('hello');
        var address = '0x623F0272B276C1B82Adc408983C257129DF90C5C';
        var contract = new this.context.drizzle.web3.eth.Contract(problemContractArtifacts.abi)
        contract._address = address;
        var contractConfig = {
            contractName: 'Problem',
            web3Contract: contract
        };
        var events = ['problemOpened']
        this.context.drizzle.addContract(contractConfig, events)

        this.state.currentStateIndex = this.contracts.Problem.methods.currentState.cacheCall()
        this.state.ipfsHashIndex = this.contracts.Problem.methods.ipfsHash.cacheCall()

        console.log(this.contracts);
        console.log(this.state);
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
                {this.addressIsRegistered() ? this.LatestProblemAddress() : ''}

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


                <button onClick={this.LoadProblemContract}>AAAAA</button>
                {this.contracts.Problem ? this.GetProblemContractDetails() : ''}
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