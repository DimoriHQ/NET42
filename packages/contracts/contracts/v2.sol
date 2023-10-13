import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract RunningNFT is ERC721URIStorage, Ownable {
    struct User {
        address userAddress; // Store the user's address
        uint256 kmGain;
    }

    mapping(uint256 => User) public users; // lay ID cho de quan ly
    mapping(uint256 => bool) public userClaimed; //kiem tra xem User da Claimed NFT chua

    struct Achievement {                  //tao struct cac giai NFT, 1 tuong ung ko hoan thanh
        uint256 kilometers;
        uint256 maxSupply;
        uint256 currentSupply;
        string metadataCID;
    }

    mapping(uint256 => Achievement) public achievements;
                                                            //giai chay chi trao thuong cho 100 nguoi ve som nhat cac hang muc, neu khong thi dc NFT chuc mung
    constructor() ERC721("RunningNFT", "RNF") {
        createAchievement(5, 100, "IPFS_CID_5KM");
        createAchievement(10, 100, "IPFS_CID_10KM");
        createAchievement(21, 100, "IPFS_CID_21KM");
        createAchievement(42, 100, "IPFS_CID_42KM");
        createAchievement(1, 600, "IPFS_CID_DNF"); // DNF achievement Did not Finish
    }

    function createAchievement(uint256 kilometers, uint256 maxSupply, string memory metadataCID) public onlyOwner {
        require(achievements[kilometers].kilometers == 0, "Achievement already exists");
        achievements[kilometers] = Achievement(kilometers, maxSupply, 0, metadataCID);
    }

    function claimed(uint256 userId, uint256 kmGain) public onlyOwner {     //ham nay de transferNFT cho nguoi thang giai
        require(userId > 0 && userId <= 1000, "Invalid user ID");          //gioi han giai chay toi da 1000 nguoi
        require(kmGain >= 0 && kmGain <= 42, "Invalid kmGain");             // so km ban chay duoc phai phu hop
        require(!userClaimed[userId],"this user already claimed");
        require(achievements[kmGain].currentSupply < achievements[kmGain].maxSupply, "We only have limited reward");
        uint256 tokenId;
        require(achievements[kmGain].currentSupply < achievements[kmGain].maxSupply, "We only have limited reward");
        tokenId = achievements[kmGain].currentSupply + 1;
            _mint(users[userId].userAddress, tokenId);
            _setTokenURI(tokenId, achievements[kmGain].metadataCID);
            achievements[kmGain].currentSupply++;
        userClaimed[userId] = true;
        users[userId] = User(users[userId].userAddress, kmGain);
    }
}