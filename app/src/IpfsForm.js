import { drizzleConnect } from 'drizzle-react'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import ipfs from './ipfs';

/*
 * Create component.
 */

class IpfsForm extends Component {
    constructor(props, context) {
        super(props)
        this.state = {
            ipfsHash: null
        };

        this.onIPFSSubmit = this.onIPFSSubmit.bind(this);
    }

    captureFile = (event) => {
        event.stopPropagation()
        event.preventDefault()
        const file = event.target.files[0]
        let reader = new window.FileReader()
        reader.readAsArrayBuffer(file)
        reader.onloadend = () => this.convertToBuffer(reader)
    };

    convertToBuffer = async(reader) => {
        //file is converted to a buffer for upload to IPFS
        const buffer = await Buffer.from(reader.result);
        //set this buffer -using es6 syntax
        this.setState({buffer});
    };

    onIPFSSubmit = async (event) => {
        event.preventDefault();

        await ipfs.add(this.state.buffer, (err, ipfsHash) => {
            console.log(err,ipfsHash);
            console.log('IPFS hash is:' + ipfsHash);
            this.setState({ ipfsHash: ipfsHash[0].hash });
        })
    };

    render() {
        return (
            <div className="App">
                <p> Select a file to send to IPFS here </p>
                <form id="ipfs-hash-form" className="scep-form" onSubmit={this.onIPFSSubmit}>
                    <input type = "file" onChange={this.captureFile} />
                    <button type="submit">Send</button>
                </form>
                <p> The IPFS hash of the sent file is: {this.state.ipfsHash}</p>
            </div>
        )
    }
}

IpfsForm.contextTypes = {
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

export default drizzleConnect(IpfsForm, mapStateToProps)