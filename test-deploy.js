// const {
//     isCallTrace,
// } = require("hardhat/internal/hardhat-network/stack-traces/message-trace")
const { ethers } = require("hardhat")
const { expect, assert } = require("chai")

// decribe is keyword that hardhat and mocha will recognize and it takes 2 params. describe() allows you to gather your tests into separate groupings within the same file, even multiple nested levels.
describe("SimpleStorage", function () {
    let simpleStorageFactory
    let simpleStorage
    //beforeEach() is run before each test in a describe.
    beforeEach(async function () {
        simpleStorageFactory = await ethers.getContractFactory("SimpleStorage")
        simpleStorage = await simpleStorageFactory.deploy()
    })
    it("Should start with a favorite number of 0", async function () {
        const currentValue = await simpleStorage.retrieve()
        const expectedValue = "0"
        //we need to use assert and or expect from chai
        assert.equal(currentValue.toString(), expectedValue) //this is asserting a retrieve to return 0 which is now going to be our expected value
    })
    it("Should update when we call store", async function () {
        const expectedValue = "7"
        const transactionResponse = await simpleStorage.store(expectedValue)
        await transactionResponse.wait(1)

        const currentValue = await simpleStorage.retrieve()
        assert.equal(currentValue.toString(), expectedValue)
    })
})

//Our simpleStorage and simpleStorageFactory variables are scoped so we need to put them outside the beforeEach so our it()'s can interact with them. so lets define them outside of the scope and also make them let variables!
//So before each one of our tests were gonna deploy our simple storage contract so we have a brand new contract to interact with for each one of our tests. inside of the it() is where we say what we want this specific test to do and then decribe the code thats gonna do that. we then add our async function to do what it is we said it() will do!
