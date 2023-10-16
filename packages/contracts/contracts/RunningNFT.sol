// SPDX-License-Identifier: MIT

pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RunningNFT is ERC721URIStorage, Ownable {
    address CampaignOwner = msg.sender;
    struct User {
        address userAddress; // Store the user's address
        uint256 kmGain;
        string codeCampaign;
    }

    mapping(uint256 => User) public users; // lay ID cho de quan ly
    // mapping(uint256 => bool) public userClaimed; //kiem tra xem User da Claimed NFT chua
    mapping(uint256 => mapping(string => bool)) public claimedNFTsCampaign; //kiem tra user da claimed NFT giai campaign chua
    
    struct Achievement {                  //tao struct cac giai NFT, 1 tuong ung ko hoan thanh
        uint256 kilometers;
        uint256 maxSupply;
        uint256 currentSupply;
        string metadataCID;
    }

    mapping(uint256 =>mapping(string => Achievement)) public achievements;
    
                                                        //giai chay chi trao thuong cho 100 nguoi ve som nhat cac hang muc, neu khong thi dc NFT chuc mung
    constructor() ERC721("RunningNFT", "RNF") Ownable(CampaignOwner) {
        createAchievement(5, 300, "QmWhfxXWkHAzMZnF2JJv8DFH95sMFGvjEGCSAPcrr9whec","BM2023");
        createAchievement(10, 300, "QmWhfxXWkHAzMZnF2JJv8DFH95sMFGvjEGCSAPcrr9whec","BM2023");
        createAchievement(21, 300, "QmWhfxXWkHAzMZnF2JJv8DFH95sMFGvjEGCSAPcrr9whec","BM2023");
        createAchievement(42, 300, "QmWhfxXWkHAzMZnF2JJv8DFH95sMFGvjEGCSAPcrr9whec","BM2023");
        createAchievement(1, 800, "QmWhfxXWkHAzMZnF2JJv8DFH95sMFGvjEGCSAPcrr9whec","BM2023"); // DNF achievement Did not Finish
    }

    function createAchievement(uint256 kilometers, uint256 maxSupply, string memory metadataCID, string memory Campaign) public onlyOwner {
        require(achievements[kilometers][Campaign].kilometers == 0, "Achievement already exists");
        achievements[kilometers][Campaign] = Achievement(kilometers, maxSupply, 0, metadataCID);
    }

    function claimed(uint256 userId, uint256 kmGain, string memory Campaign) public {     //ham nay de transferNFT cho nguoi thang giai
        // require(users[userId].userAddress == msg.sender);       
        require(userId > 0 && userId <= 2000, "Invalid user ID");          //gioi han giai chay toi da 1000 nguoi
        require(kmGain >= 0 , "Invalid kmGain");             // so km ban chay duoc phai phu hop
        require(!claimedNFTsCampaign[userId][Campaign],"user already claimed reward in this Campaign");          
        
        uint256 tokenId;
        if (kmGain < 5){ 
            kmGain = 1;
        }

        else if( kmGain >= 5 && kmGain <10){
            kmGain = 5;
        }
        else if( kmGain >= 10 && kmGain <21){
            kmGain = 10;
        }
        else if (kmGain >= 21 && kmGain < 42){
            kmGain = 21;
        }
        else kmGain =42;
        require(achievements[kmGain][Campaign].currentSupply < achievements[kmGain][Campaign].maxSupply, "We only have limited reward");
        tokenId = achievements[kmGain][Campaign].currentSupply + 1;
            _mint(msg.sender, tokenId);
            _setTokenURI(tokenId, achievements[kmGain][Campaign].metadataCID);
            achievements[kmGain][Campaign].currentSupply++;

        claimedNFTsCampaign[userId][Campaign] = true;

        User storage user = users[userId];
        user.userAddress = msg.sender;
        user.kmGain = kmGain;
        user.codeCampaign = Campaign;
    }
}