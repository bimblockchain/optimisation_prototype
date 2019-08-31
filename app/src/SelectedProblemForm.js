import { drizzleConnect } from 'drizzle-react';
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Container, Row, Col } from 'reactstrap';
import "bootstrap/dist/css/bootstrap.css";

class SelectedProblemForm extends Component{
    constructor(props, context) {
        super(props)
        this.contracts = context.drizzle.contracts

    }

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
        return (<p>hello</p>);
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