const Web3 = require('web3');
import BIMManager from '../../app/src/contracts/BIMManager.json';
import Solution from '../../app/src/contracts/Solution.json';

const web3 = new Web3(new Web3.providers.HttpProvider("http://127.0.0.1:7545"));
const express = require('express');
const bodyParser = require('body-parser');
const api = express();
const abi = BIMManager.abi;
const networkId = "4447" //set this for ganache-cli
const address = BIMManager.networks[networkId].address;
const bimManagerContract = new web3.eth.Contract(abi, address);

api.use(express.static(__dirname + '/public'));
api.use(bodyParser.json())

api.listen(3001, () => {
    console.log('API up and running');
});

api.post('/add', (req, res) => {
    console.log(req.body);
    res.send('It works!');
});

api.post('/sendTransaction', async (req, res) => {
    console.log('start of blockchain interaction');
    var optimisedValue = req.body.OptimisedValue;
    var contractAddress = req.body.ContractAddress;
    var privateKey = req.body.PrivateKey;

    var contractAbi = Solution.abi;
    var contract = new web3.eth.Contract(contractAbi, contractAddress);
    var sendValue = contract.methods.sendValue(optimisedValue).encodeABI();
    var transactionToIncrementCounter = await web3.eth.accounts.signTransaction(
        {
            data: sendValue,
            to: contractAddress,
            gas: '2000000'
        },
        privateKey
    );
    console.log(transactionToIncrementCounter);
    web3.eth.sendSignedTransaction(transactionToIncrementCounter.rawTransaction)
        .then(receipt => console.log("Transaction receipt: ", receipt))
        .catch(err => console.error(err));

    res.send('Success')

});
