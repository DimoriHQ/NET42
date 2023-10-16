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
    // Call a function to allow user1 to claim NFTs and check if they were claimed successfully.
    await runningNFT.createAchievement(21, 300, "IPFS_CID_21KM", "Campaign3");
    await runningNFT.connect(user1).claimed(2, 21, "Campaign3");
    const user1NFTBalance = await runningNFT.balanceOf(user1.address);

    expect(user1NFTBalance).to.equal(1);
  });

  
  it("Should not allow users to claim the same NFT twice", async function () {
    // Attempt to claim an NFT again and check if it fails as expected.
    await expect(runningNFT.connect(user1).claimed(2, 5, "Campaign3")).to.be.reverted;
  });

  it("Let user can mint another NFT in another Campaign", async function () { 
    await expect(runningNFT.connect(user1).claimed(1, 5, "Campaign1")).not.to.be.reverted;
  });

  it("Should allow users to claim NFTs", async function () {
    // Call a function to allow user2 to claim NFTs and check if they were claimed successfully.
    await runningNFT.createAchievement(42, 300, "IPFS_CID_42KM", "Campaign4");
    await runningNFT.connect(user2).claimed(2, 52, "Campaign4");
    const user2NFTBalance = await runningNFT.balanceOf(user2.address);

    expect(user2NFTBalance).to.equal(1);
  });
  
});













