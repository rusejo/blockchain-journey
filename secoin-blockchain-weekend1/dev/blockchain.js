//This is our blockchain data structure. (MODULE)

//Bring the hash package to this project to access the library.
const sha256 = require('js-sha256');

//This is a 'constructor' function: data object.
function Blockchain() {
    this.chain = []; //Initialize the chain to and empty array. We will store all of our blocks here.
    this.newTransactions = [] //Hold all the new transactions before they are 'mined' into a block.

    //Genesis block: the concept of the first block in our chain. An empty one. 
    this.createNewBlock(100,'0','0');
};

/*Extend object functionality (Method)
  Record the data on a new block*/

Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
    //Constants variables
    const newBlock = {
        index: this.chain.length + 1, //What block is this in out chain.
        timestamp: Date.now(),
        transactions: this.newTransactions, //All of the transactions on this block.
        nonce: nonce, //Unique number (only used once). Proof that we actually create a legit block.
        hash: hash, //The data from our new block.
        previousBlockHash: previousBlockHash //Data from our current block hashed into a string
    };

    this.newTransactions = []; //Clears out any newTransactions
    this.chain.push(newBlock); //Add the newBlock to the chain.

    return newBlock;
}

//Another method to get the last block
Blockchain.prototype.getLastBlock = function () {
    return this.chain[this.chain.length - 1];
}

//Another method to create a new transaction
Blockchain.prototype.createNewTransaction = function (amount, sender, recipient) {
    const newTransaction = {
        //Create a new transaction object
        amount: amount,
        sender: sender,
        recipient: recipient
    };

    //Save data into the transactions array.
    this.newTransactions.push(newTransaction);
    return this.getLastBlock()['index'] + 1; //Get the index of the last block of out chain plus one for a new block
}

//Another method to get the last transaction.
Blockchain.prototype.getLastTransaction = function () {
    return this.newTransactions[this.newTransactions.length - 1];
}

//Method to hash a block: take the block data and give us a hash string.
Blockchain.prototype.hashBlock = function (previousBlockHash, currentBlockData, nonce) {
    //Concatenate string
    const dataAsString = previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData); //Turns an object data into a string
    //Pass all of out data as string into the hasher
    const hash = sha256(dataAsString);
    return hash;
}

//Bussines rule: 0, 00, 000, etc.
Blockchain.prototype.proofOfWork = function (previousBlockHash, currentBlockData) {
    //Brute force, increment nonce and run the hash until satisfy the business level/difficulty level '0000'.
    let nonce = 0; //let because the variable change.
    //Create a hash block.
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    //Execute this code as long as we don't have '0000'.
    while (hash.substring(0, 2) !== '00') {
        nonce++;
        hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }
    return nonce;
}

//Statement of NodeJS that makes everything a module and bind it to another.
module.exports = Blockchain;