const Web3 = require('web3');
import BIMManager from './contracts/BIMManager.json';

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

api.listen(3000, () => {
    console.log('API up and running');
});

api.post('/add', (req, res) => {
    console.log(req.body);
    res.send('It works!');
});

api.post('/sendTransaction', async (req, res) => {
    console.log('start of blockchain interaction');
    console.log(req.body);
    console.log(address);

    console.log(await registerProblemOwner());
    //await createProblem();
    res.send('Success')

});

const registerProblemOwner = async () => {
    console.log('registerProblemOwner');
    var x = await bimManagerContract.methods.registerProblemOwner().call() //.catch((err) => { console.log(err); });
    return x;
}

const createProblem = async () => {
    console.log('createProblem');
    return await bimManagerContract.methods.createProblem().call()
}

    // web3.eth.getAccounts().then((accounts) => {
    //     console.log(accounts);
    // }).catch(console.log);
// account = (accounts[0]);
// console.log(account);
// // web3.eth.getBalance(account).then((val)=> {
// //     console.log(val);
// // });