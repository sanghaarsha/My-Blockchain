// importing crypto library for SHA256
const sha256 = require("crypto-js/sha256");

class Block {
    constructor(index, timestamp, data, previousHash = "") {
        this.index = index;
        this.timestamp = timestamp;
        this.data = data;
        this.previousHash = previousHash;
        this.hash = this.calculateHash();
    }

    calculateHash() {
        return sha256(
            this.index +
                this.previousHash +
                this.timestamp +
                JSON.stringify(this.data)
        ).toString();
    }
}

class Blockchain {
    constructor() {
        this.chain = [this.createGenesisBlock()];
    }

    createGenesisBlock() {
        return new Block(0, "21/08/2021", "Genesis Block", "0");
    }

    getLatestBlock() {
        return this.chain[this.chain.length - 1];
    }

    addBlock(newBlock) {
        newBlock.previousHash = this.getLatestBlock().hash;
        // re-calculate hash after a property changes
        newBlock.hash = newBlock.calculateHash();
        this.chain.push(newBlock);
    }

    // checking validity of blocks by comparing hashes
    isChainValid() {
        for (let index = 1; index < this.chain.length; index++) {
            const currentBlock = this.chain[index];
            const previousBlock = this.chain[index - 1];

            if (currentBlock.hash !== currentBlock.calculateHash()) {
                return false;
            }
            if (currentBlock.previousHash !== previousBlock.hash) {
                return false;
            }

            return true;
        }
    }
}

const sangCoin = new Blockchain();
sangCoin.addBlock(new Block(1, "21/08/21", { amount: 4 }));
sangCoin.addBlock(new Block(2, "22/08/21", { amount: 10 }));

console.log(JSON.stringify(sangCoin, null, 4));
console.log("is chain valid?", sangCoin.isChainValid());
