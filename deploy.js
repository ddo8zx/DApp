// deploy.js
const { ethers } = require("hardhat");

async function main() {
    // Compile contracts before deploying
    await hre.run('compile');

    // Get the ContractFactory
    const BettingContract = await ethers.getContractFactory("Betting");
    
    // Deploy the contract
    const bettingContract = await BettingContract.deploy(); 

    // Wait for the deployment to be confirmed
    await bettingContract.deployTransaction.wait(); // Wait for the deployment transaction

    console.log("BettingContract deployed to:", bettingContract.address); // Log the contract address
}

// Handle errors
main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });