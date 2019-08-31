import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import W3 from 'web3';
import {
    AccountData,
    ContractData,
    ContractForm,
} from "drizzle-react-components";
import { Container, Row, Col } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import BetterContractForm from "./BetterContractForm";

import problemContractArtifacts from './contracts/Problem.json';

const web3 = new W3(new W3.providers.HttpProvider('https://localhost:7545'));

class SelectedProblemForm extends Component{
    constructor(props, context) {
        super(props)
        this.contracts = context.drizzle.contracts

    }

    LoadProblemContract = async (address) => {
        address = '0x623F0272B276C1B82Adc408983C257129DF90C5C';
        var contract = new web3.eth.Contract(problemContractArtifacts.abi)
        contract._address = address;
        var contractConfig = {
            contractName: 'Problem',
            web3Contract: contract
        };
        var events = ['problemOpened']
        this.context.drizzle.addContract(contractConfig, events)
    };

    SetProblemId = (id) => {
        this.props.problemId = id;
    };

    GetProblemAddressById = (id) => {
        console.log(id);
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
        this.LoadProblemContract('');
        console.log(this.state);
        if (!this.currentStateIndex) { return <span>Fetching...</span>; }

        return (
            <div className="app">
                hello
            </div>
        )
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