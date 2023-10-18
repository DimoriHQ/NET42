import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import { ethers, upgrades } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", owner.address);
  console.log("Account balance:", (await owner.getBalance()).toString());

  const NET42NFT = await ethers.getContractFactory("NET42NFT");
  const deployNET42NFT = await upgrades.deployProxy(NET42NFT);
  const net42NFT = await deployNET42NFT.deployed();

  console.table({
    NET42NFT: net42NFT.address,
  });

  /*
┌──────────┬──────────────────────────────────────────────┐
│ (index)  │                    Values                    │
├──────────┼──────────────────────────────────────────────┤
│ NET42NFT │ '0xD7B12d40efC325cA818dFE0ACA3e982662C04228' │
└──────────┴──────────────────────────────────────────────┘
*/
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
