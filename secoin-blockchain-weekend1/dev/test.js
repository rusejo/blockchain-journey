//Import the constructor function.
const Blockchain = require('./blockchain.js');

//Create a new block
const secoin = new Blockchain(); //Invoque a new instance of blockchain data module.
console.log("Create a new block -->")
console.log(secoin); //View the entire block.

//Remember .createNewBlock need three parameters (nonce, previousHash, hash).
//Create some random blocks.
secoin.createNewBlock(12342, "ABCSTWJ3SD", "JPEKSLADSA");
secoin.createNewBlock(64538, "4BCS4533FD", "AHJFGPSISA");
console.log("Create news block -->")
console.log(secoin);

//View the last block
console.log("View the last block -->")
console.log(secoin.getLastBlock());

//Create new transaction
secoin.createNewTransaction(100, "JOS30120I2", "MONSWO28391");
secoin.createNewTransaction(200, "JPEP2DASSA", "FKANSKQUHDA");
secoin.createNewTransaction(300, "K34UDNBSAK", "GHWTEBABSAS");
console.log("Create and view new transactions -->")
console.log(secoin);

//Get the last transaction
console.log("Get the last transacition -->")
console.log(secoin.getLastTransaction());

//Get an specific block
console.log("Get and specific block -->")
console.log(secoin.chain['0']);

//Test data for now
const previousBlockHash = 'A9089AUD8A8UA8GSDA';
const currentBlockData = [{
    "amount": 50,
    "sender": "ALEX00IIO99GHAHBA1",
    "recipient": "RODRIGOOOIJOI9ABAABAS1",
},
{
    "amount": 150,
    "sender": "ALEX00IIO99GHAHBA2",
    "recipient": "RODRIGOOOIJOI9ABAABAS2",
},
{
    "amount": 5,
    "sender": "ALEX00IIO99GHAHBA3",
    "recipient": "RODRIGOOOIJOI9ABAABAS3",
}
];

//const nonce = 100;
//Simple hashing Note: if you wanna run, comment the proof of work and viceversa.
//console.log("sha-256 Hash -->")
//console.log(secoin.hashBlock(previousBlockHash, currentBlockData, nonce));

//Proof of work
let nonce = secoin.proofOfWork(previousBlockHash, currentBlockData);
console.log('Nonce from Proof of Work -->' + nonce);
console.log(secoin.hashBlock(previousBlockHash, currentBlockData, nonce));
console.log(secoin);