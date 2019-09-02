import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Container, Row, Col } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";
import BetterContractForm from "./BetterContractForm";

class ProblemOptimiserForm extends Component{
    constructor(props, context) {
        super(props)
        this.contracts = context.drizzle.contracts
        this.state = {
            getTotalProblemsIndex: this.contracts.BIMManager.methods.getTotalProblems.cacheCall(),
            registeredProblemOptimisersIndex: this.contracts.BIMManager.methods.registeredProblemOptimisers.cacheCall(...[this.props.accounts[0]]),
        };
        //this.onIPFSSubmit = this.onIPFSSubmit.bind(this);
    }

    getNumberOfProblems = () => {
        return this.props.contracts.BIMManager.getTotalProblems[this.state.getTotalProblemsIndex].value;
    };

    addressIsRegistered = () => {
        return this.props.contracts.BIMManager.registeredProblemOptimisers[this.state.registeredProblemOptimisersIndex].value;
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
                            method="unregisterProblemOptimiser"
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
                            method="registerProblemOptimiser"
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
                        Create a New Solution
                    </Col>
                    <Col>
                    <BetterContractForm
                        contract="BIMManager"
                        method="createSolution"
                        submitText="Create"
                        buttonClassName = "btn btn-primary btn-block"/>
                    </Col>
                </Row>
            </Container>
        );
    };

    render() {
        if (
            !(this.state.getTotalProblemsIndex in this.props.contracts.BIMManager.getTotalProblems &&
                this.state.registeredProblemOptimisersIndex in this.props.contracts.BIMManager.registeredProblemOptimisers
            )
        ) { return <span>Fetching...</span>; }

        var registeredStatus = this.AddressIsNotRegistered();
        if(this.addressIsRegistered())
        {
            registeredStatus = this.AddressIsRegistered();
        }

        var createNew = this.addressIsRegistered() ? this.CreateNewProblem() : <p>Register Address to add new Solution</p>

        return (
            <div className="app">
                {registeredStatus}
                {createNew}
            </div>
        )
    }
}

ProblemOptimiserForm.contextTypes = {
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

export default drizzleConnect(ProblemOptimiserForm, mapStateToProps)