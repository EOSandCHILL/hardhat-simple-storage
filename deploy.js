//imports
const { ethers, run, network } = require("hardhat")
// importing run from hard hat which allows us to run any hard hat task

// async main
async function main() {
    const SimpleStorageFactory = await ethers.getContractFactory(
        "SimpleStorage"
    )
    console.log("Deploying Contract...")
    const simpleStorage = await SimpleStorageFactory.deploy()
    await simpleStorage.deployed()
    console.log(`deployed contract to: ${simpleStorage.address}`)
    // due to using hardhat we dont need to verify our contract but if were using an outside network we should...
    //console.log(network.config) // this will give us information about the current network we are using and deploying to
    if (network.config.chainId === 5 && process.env.ETHERSCAN_API_KEY) {
        console.log("waiting for block confirmations")
        await simpleStorage.deployTransaction.wait(6)
        await verify(simpleStorage.address, [])
    }
    // interacting with the contract next
    // lets get the current value of the favorite number
    const currentValue = await simpleStorage.retrieve()
    console.log(`current value is: ${currentValue}`)

    //lets update the current value!
    const transactionResponse = await simpleStorage.store(7)
    await transactionResponse.wait(1)
    const updatedValue = await simpleStorage.retrieve()
    console.log(`Updated value is: ${updatedValue}`)
}

const verify = async (contractAddress, args) => {
    console.log("verifying contract")
    try {
        await run("verify:verify", {
            address: contractAddress,
            constructorArguments: args,
        }) // "verify" is the main task--":verify" is a subtask--{where actual parameters go}
    } catch (e) {
        if (e.message.toLowerCase().includes("already verified")) {
            console.log("Already Verified")
        } else {
            console.log(e)
        }
    } // this is a try catch and e is for error! The try statement allows you to define a block of code to be tested for errors while it is being executed.
}

// main
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

// the entire main function deploys our contract and if were usung a test net it also verifies our contract
// Next it updates the value of the persons favorite number to 7
// at the very end we have the code the calls our main function
