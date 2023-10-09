import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import { ethers, upgrades } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", owner.address);
  console.log("Account balance:", (await owner.getBalance()).toString());

  const NET42NFT = await ethers.getContractFactory("NET42NFT");
  await upgrades.upgradeProxy("", NET42NFT);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
