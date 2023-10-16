const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("RunningNFT", function () {
  let runningNFT;
  let owner;
  let user1;
  let user2;

  before(async () => {
    const RunningNFT = await ethers.getContractFactory("RunningNFT");
    [owner, user1, user2] = await ethers.getSigners();

    runningNFT = await RunningNFT.deploy();
    await runningNFT.deployed();
  });

  it("Should create achievements", async function () {
    // Call a function to create achievements and check if they were created successfully.
    await runningNFT.createAchievement(5, 300, "IPFS_CID_5KM", "Campaign1");
    await runningNFT.createAchievement(10, 300, "IPFS_CID_10KM", "Campaign2");
    const achievement = await runningNFT.achievements(5, "Campaign1");

    expect(achievement.kilometers).to.equal(5);
    expect(achievement.maxSupply).to.equal(300);
    expect(achievement.metadataCID).to.equal("IPFS_CID_5KM");
  });


  it("Should allow users to claim NFTs", async function () {
    // Call a function to allow users to claim NFTs and check if they were claimed successfully.
    await runningNFT.createAchievement(21, 300, "IPFS_CID_21KM", "Campaign3");
    await runningNFT.claimed(2, 21, "Campaign3");
    const user1NFTBalance = await runningNFT.balanceOf(owner.address);

    expect(user1NFTBalance).to.equal(1);
  });

  
  // it("Should not allow users to claim the same NFT twice", async function () {
  //   // Attempt to claim an NFT again and check if it fails as expected.
  //   await expect(runningNFT.claimed(2, 5, "Campaign1")).not.to.be.reverted;
  // });

  it("Let user can mint another NFT in another Campaign", async function () { //Khánh muốn kiểm tra là ok, Khánh đã mint thành công NFT giải Campaign3, giải đó Khánh có 
                                                                                    //ID =2. Bây giờ vs giải Campaign1, Khánh có ID 1, cũng muốn mint NFT giải này, thì bị revert?
    // Attempt to claim an NFT and check if it fails as expected.
    await expect(runningNFT.claimed(1, 5, "Campaign1")).not.to.be.reverted;
  });
  
});




