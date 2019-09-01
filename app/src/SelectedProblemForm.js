import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, Container, Row, Col } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import { ContractData, ContractForm } from "drizzle-react-components";
import problemContractArtifacts from './contracts/Problem.json';
import IpfsForm from "./IpfsForm";
import BetterContractForm from "./BetterContractForm";
import BetterContractData from "./BetterContractData";

class SelectedProblemForm extends Component{
    constructor(props, context) {
        super(props)
        this.contracts = context.drizzle.contracts
        this.state = {
            //problemOwnerProblemIds
            problemOwnerProblemIdsIndex: this.contracts.BIMManager.methods.problemOwnerProblemIds.cacheCall(...[this.props.accounts[0]]),
            //problemIdAddressesIndex: this.contracts.BIMManager.methods.problemIdAddresses.cacheCall(...[this.props.problemId]),
        }
    }

    SetProblemId = (id) => {
        this.props.problemId = id;
    };

    GetProblemAddressById = (id) => {
        console.log(id);
    };

    GetProblemIdFromUserAddress = () => {
        return this.props.contracts.BIMManager.problemOwnerProblemIds[
            this.state.problemOwnerProblemIdsIndex
        ].value;
    };

    GetProblemAddressFromProblemId = async () => {
        var id = this.GetProblemIdFromUserAddress();
        return await this.contracts.BIMManager.methods.problemIdAddresses(id).call();
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
        var address = await this.GetProblemAddressFromProblemId();
        console.log(address);
        var contract = new this.context.drizzle.web3.eth.Contract(problemContractArtifacts.abi)
        contract._address = address;
        contract.options.from = this.props.accounts[0];
        var contractConfig = {
            contractName: 'Problem',
            web3Contract: contract
        };
        var events = [
            'problemOpened',
            'problemSolved',
            'problemCompleted',
            'problemCancelled',
        ]
        this.context.drizzle.addContract(contractConfig, events)

        this.state.currentStateIndex = this.contracts.Problem.methods.currentState.cacheCall()
        this.state.ipfsHashIndex = this.contracts.Problem.methods.ipfsHash.cacheCall()
    };

    ProblemInteractions = () => {
        return (
            <Container>
                <Row>
                    <Col>
                        Selected Problem Address
                    </Col>
                    <Col>
                        <div className="badge badge-primary text-wrap">
                        <BetterContractData
                            contract="BIMManager"
                            method="problemIdAddresses"
                            methodArgs={[this.GetProblemIdFromUserAddress()]}
                            callBack={this.SelectedAddressCallback}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Selected Problem ID
                    </Col>
                    <Col>
                        <div className="badge badge-primary text-wrap">
                        <ContractData
                            contract="BIMManager"
                            method="problemOwnerProblemIds"
                            methodArgs={[this.props.accounts[0]]}/>
                        </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Load Problem
                    </Col>
                    <Col>
                        <Button
                            color="primary"
                            className="btn btn-primary btn-block"
                            onClick={this.LoadProblemContract}>
                                Load
                        </Button>
                    </Col>
                </Row>
            </Container>
        );
    };

    IpfsInteraction = () => {
        return (
            <Container>
                <Row>
                    <IpfsForm callBack={this.IpfsFormCallback}/>
                </Row>
            </Container>
        );
    };

    IpfsFormCallback = (ipfsHash) => {
        this.setState({latestIpfsHash: ipfsHash});
        console.log(this.state.latestIpfsHash);
    };

    SelectedAddressCallback = (address) => {
        this.setState({selectedAddress: address});
        console.log(this.state.selectedAddress);
    };

    SendIpfsHashToBlockchainClick = async () => {
        var address = await this.GetProblemAddressFromProblemId();
        this.contracts.BIMManager.methods.associateIPFS.cacheSend(this.state.latestIpfsHash, address);
    };

    SendIpfsHashToBlockchain = () => {
        return (
            <Container>
                <Row>
                    <Col>
                        Send IPFS Hash to selected contract
                    </Col>
                    <Col>
                    <Button className='btn btn-primary btn-block' onClick={this.SendIpfsHashToBlockchainClick}>
                        Send IPFS
                    </Button>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Associated IPFS Hash:
                    </Col>
                    <Col>
                    <div className="badge badge-primary text-wrap">
                        <ContractData
                            contract="Problem"
                            method="ipfsHash"/>
                    </div>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        Open Problem:
                    </Col>
                    <Col>
                    <BetterContractForm
                        contract="Problem"
                        method="openProblem"
                        submitText="Open"
                        buttonClassName = "btn btn-primary btn-block"/>
                    </Col>
                </Row>
            </Container>
        );
    };

    // GetProblemContractDetails = () => {
    //     return (
    //         <Container>
    //             <Row>
    //                 <Col>
    //                     Problem ID:
    //                 </Col>
    //                 <Col>
    //                     <ContractData
    //                         contract="Problem"
    //                         method="currentState"/>
    //                 </Col>
    //                 <Col>
    //                 <ContractForm
    //                         contract="Problem"
    //                         method="openProblem"
    //                         methodArgs={this.props.accounts[0]}/>
    //                 </Col>
    //             </Row>
    //         </Container>
    //     );
    // };

    render() {
        if (!(this.state.problemOwnerProblemIdsIndex in this.props.contracts.BIMManager.problemOwnerProblemIds)) { return <span>Fetching...</span>; }

        return (
            <div>
                {this.GetProblemIdFromUserAddress() < 1 ?
                    'Create a problem from this address' :
                    this.ProblemInteractions()}
{/* 
                {this.contracts.Problem ? this.GetProblemContractDetails() : ''} */}

                {this.contracts.Problem ? this.IpfsInteraction() : ''}

                {this.state.latestIpfsHash? this.SendIpfsHashToBlockchain() : ''}
            </div>
        );
    }
}

SelectedProblemForm.contextTypes = {
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

export default drizzleConnect(SelectedProblemForm, mapStateToProps)