// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract nftNET42 is ERC721URIStorage { //nay la NFT dong, tu no bien doi theo data truyen vao. lam onchain va ko dung ben thu 3 luu tru
    address owner = msg.sender;
    using Strings for uint256;
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(uint256 => uint256) public tokenIdToLevels;

    constructor() ERC721("nftNET42", "N42") {}

    function generateCharacter(uint256 tokenId) public view returns (string memory) {
        bytes memory svg = abi.encodePacked(
            '<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMinYMin meet" viewBox="0 0 350 350">',
            "<style>.base { fill: blue; font-family: serif; font-size: 14px; }</style>",
            '<rect width="100%" height="100%" fill="yellow" />',
            '<text x="50%" y="40%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "Tks for join campaign",
            "</text>",
            '<text x="50%" y="50%" class="base" dominant-baseline="middle" text-anchor="middle">',
            "You gain: ",
            getLevels(tokenId),
            " km",
            "</text>",
            "</svg>"
        );

        return string(abi.encodePacked("data:image/svg+xml;base64,", Base64.encode(svg)));
    }

    //ham xac dinh so km chay duoc cua nguoi co so bao danh la tokenID
    function getLevels(uint256 tokenId) public view returns (string memory) {
        uint256 levels = tokenIdToLevels[tokenId];
        return levels.toString();
    }

    //get URI cua NFT trophy
    function getTokenURI(uint256 tokenId) public view returns (string memory) {
        bytes memory dataURI = abi.encodePacked(
            "{",
            '"name": "nftNET42 #',
            tokenId.toString(),
            '",',
            '"description": "Run for education campaign",',
            '"image": "',
            generateCharacter(tokenId),
            '"',
            "}"
        );

        return string(abi.encodePacked("data:application/json;base64,", Base64.encode(dataURI)));
    }

    function mint() public {
        _tokenIds.increment();
        uint256 newItemId = _tokenIds.current();
        _safeMint(msg.sender, newItemId);
        tokenIdToLevels[newItemId] = 0;
        _setTokenURI(newItemId, getTokenURI(newItemId));
    }

    function train(uint256 tokenId, uint256 achieved) public {
        require(_exists(tokenId), "check not found tokenId");
        // require(ownerOf(tokenId) == msg.sender, "");
        require(ownerOf(tokenId) == owner, "init, the deployer of contract only hold NFT");
        uint256 currentLevel = tokenIdToLevels[tokenId];
        tokenIdToLevels[tokenId] = currentLevel + achieved;
        _setTokenURI(tokenId, getTokenURI(tokenId));
    }
}
