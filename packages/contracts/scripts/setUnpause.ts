import "@nomiclabs/hardhat-ethers";
import "@openzeppelin/hardhat-upgrades";
import { ethers } from "hardhat";

async function main() {
  const [owner] = await ethers.getSigners();
  console.log("Deploying contracts with the account:", owner.address);
  console.log("Account balance:", (await owner.getBalance()).toString());

  const NET42NFT = await ethers.getContractFactory("NET42NFT");
  const net42NFT = NET42NFT.attach("0xD7B12d40efC325cA818dFE0ACA3e982662C04228");

  const tx = await net42NFT.connect(owner).unpause();
  console.log(tx.hash);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
