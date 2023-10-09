import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", owner.address);
  console.log("Account balance:", (await owner.getBalance()).toString());

  const NET42NFT = await ethers.getContractFactory("NET42NFT");
  const net42NFT = NET42NFT.attach("0xFDD8077253237cAdEd0FE662e6755F26886b3CC0");

  const tx = await net42NFT.connect(owner).setBaseTokenURL("");
  console.log(tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
