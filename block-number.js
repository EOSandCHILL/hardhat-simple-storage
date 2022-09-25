// https://hardhat.org/hardhat-runner/docs/advanced/create-task

// we first need to import our task to get block numbers on whatever chain were working with
// LETS IMPORT THE TASK FUNCTION!!
const { task } = require("hardhat/config") // <- /config has the task function

// to define a task give it a name and description
task("block-number", "Prints the current block number").setAction(
    //anonymous function below because it has no name
    async (taskArgs, hre) => {
        const blockNumber = await hre.ethers.provider.getBlockNumber()
        console.log(`Current block number is: ${blockNumber}`)
    }
)
