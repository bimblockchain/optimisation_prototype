import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import { ContractData, ContractForm } from "drizzle-react-components";
import solutionContractArtifacts from './contracts/Solution.json';
import BetterContractForm from "./BetterContractForm";
import BetterContractData from "./BetterContractData";

class SelectedSolutionForm extends Component{
    constructor(props, context) {
        super(props)
        this.contracts = context.drizzle.contracts
        this.state = {
            //problemOwnerProblemIds
            problemOptimiserSolutionIdsIndex: this.contracts.BIMManager.methods.problemOptimiserSolutionIds.cacheCall(...[this.props.accounts[0]]),
            //problemIdAddressesIndex: this.contracts.BIMManager.methods.problemIdAddresses.cacheCall(...[this.props.problemId]),
        }
    }

    SetSolutionId = (id) => {
        this.props.solutionId = id;
    };

    GetSolutionAddressById = (id) => {
        console.log(id);
    };

    GetSolutionIdFromUserAddress = () => {
        return this.props.contracts.BIMManager.problemOptimiserSolutionIds[
            this.state.problemOptimiserSolutionIdsIndex
        ].value;
    };

    GetSolutionAddressFromSolutionId = async () => {
        var id = this.GetSolutionIdFromUserAddress();
        return await this.contracts.BIMManager.methods.solutionIdAddresses(id).call();
    };

    LoadSolutionContract = async () => {
        var address = await this.GetSolutionAddressFromSolutionId();
        var contract = new this.context.drizzle.web3.eth.Contract(solutionContractArtifacts.abi)
        contract._address = address;
        contract.options.from = this.props.accounts[0];
        var contractConfig = {
            contractName: 'Solution',
            web3Contract: contract
        };
        var events = [
            'solutionOpened',
            'solutionAccepted',
            'solutionRejected',
            'solutionCompleted',
            'solutionCancelled'
        ]
        this.context.drizzle.addContract(contractConfig, events)
        this.state.currentStateIndex =
            this.contracts.Solution.methods.currentState.cacheCall()

        this.state.getAssociatedProblemIpfsHashIndex =
            this.contracts.Solution.methods.getAssociatedProblemIpfsHash.cacheCall()
    };

    divStyle = {
        border: '5px solid white'
    };

    SolutionInteractions = () => {
        return (
            <Container>
                <Row style={this.divStyle}>
                    <Col>
                        Address:
                    </Col>
                    <Col>
                        <BetterContractData
                            contract="BIMManager"
                            method="solutionIdAddresses"
                            methodArgs={[this.GetSolutionIdFromUserAddress()]}
                            callBack={this.SelectedAddressCallback}/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Selected Solution ID
                    </Col>
                    <Col>
                        <div className="badge badge-primary text-wrap">
                        <ContractData
                            contract="BIMManager"
                            method="problemOptimiserSolutionIds"
                            methodArgs={[this.props.accounts[0]]}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Load Solution
                    </Col>
                    <Col>
                        <Button
                            color="primary"
                            className="btn btn-primary btn-block"
                            onClick={this.LoadSolutionContract}>
                                Load
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    };


    SelectedAddressCallback = (address) => {
        this.setState({selectedAddress: address});
        console.log(this.state.selectedAddress);
    };

    GetIpfsHash = () => {
        //return await this.contracts.Solution.methods.getAssociatedProblemIpfsHash().call();
        if (!(this.state.getAssociatedProblemIpfsHashIndex in this.props.contracts.Solution.getAssociatedProblemIpfsHash)) { return ""; }

        return this.props.contracts.Solution.getAssociatedProblemIpfsHash[
            this.state.getAssociatedProblemIpfsHashIndex
        ].value;
    };

    IpfsFileLink = () => {
        var ipfsUrl = 'http://127.0.0.1:8080/ipfs/' + this.GetIpfsHash()
        return (
        <a href = {ipfsUrl}>
            Click Here
        </a>
        );
    }

    GetSolutionContractDetails = () => {
        return (
            <Container>
                <Row>
                    <Col>
                        IPFS File Hash
                    </Col>
                    <Col>
                        <ContractData
                            contract="Solution"
                            method="getAssociatedProblemIpfsHash"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        IPFS File Link
                    </Col>
                    <Col>
                        {this.IpfsFileLink()}
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Solution State
                    </Col>
                    <Col>
                        <ContractData
                            contract="Solution"
                            method="currentState"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Current Optimised Value:
                    </Col>
                    <Col>
                    <ContractData
                        contract="Solution"
                        method="currentOptimisedValue"/>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Submit Optimised Value
                    </Col>
                    <Col>
                    <BetterContractForm
                        contract="Solution"
                        method="sendValue"
                        submitText="Send Value"
                        buttonClassName = "btn btn-primary btn-block"/>
                    </Col>
                </Row>
            </Container>
        );
    };

    render() {
        if (!(this.state.problemOptimiserSolutionIdsIndex in this.props.contracts.BIMManager.problemOptimiserSolutionIds)) { return <span>Fetching...</span>; }

        return (
            <div>
                {this.GetSolutionIdFromUserAddress() < 1 ?
                    'Create a problem from this address' :
                    this.SolutionInteractions()}

                {this.contracts.Solution ? this.GetSolutionContractDetails() : ''}


            </div>
        );
    }
}

SelectedSolutionForm.contextTypes = {
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

export default drizzleConnect(SelectedSolutionForm, mapStateToProps)