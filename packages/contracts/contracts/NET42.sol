// SPDX-License-Identifier: None
pragma solidity ^0.8.20;

import "@openzeppelin/contracts-upgradeable/token/ERC721/ERC721Upgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721EnumerableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721URIStorageUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/security/PausableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/access/AccessControlUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/token/ERC721/extensions/ERC721BurnableUpgradeable.sol";
import "@openzeppelin/contracts-upgradeable/proxy/utils/Initializable.sol";
import "@openzeppelin/contracts-upgradeable/utils/CountersUpgradeable.sol";
import {Strings} from "@openzeppelin/contracts/utils/Strings.sol";

// WIP
contract NET42NFT is Initializable, ERC721Upgradeable, ERC721EnumerableUpgradeable, PausableUpgradeable, AccessControlUpgradeable, ERC721BurnableUpgradeable {
    using AddressUpgradeable for address;
    using StringsUpgradeable for uint256;
    using CountersUpgradeable for CountersUpgradeable.Counter;

    bytes32 public constant PAUSER_ROLE = keccak256("PAUSER_ROLE");
    bytes32 public constant MINTER_ROLE = keccak256("MINTER_ROLE");

    CountersUpgradeable.Counter private tokenId;

    string public baseTokenURI;
    string public baseExtension;

    mapping(uint256 => uint256) tokenType;
    // 0 = achievement
    // 1 = campaign

    mapping(uint256 => uint256) achievements;
    mapping(uint256 => uint256) campaignIds;
    mapping(uint256 => uint256) campaignNfts;

    /// @custom:oz-upgrades-unsafe-allow constructor
    constructor() {
        _disableInitializers();
    }

    function initialize() public initializer {
        __ERC721_init("NET42", "N42");
        __ERC721Enumerable_init();
        __Pausable_init();
        __AccessControl_init();
        __ERC721Burnable_init();

        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(PAUSER_ROLE, msg.sender);
        _grantRole(MINTER_ROLE, msg.sender);

        _pause();
    }

    function pause() public onlyRole(PAUSER_ROLE) {
        _pause();
    }

    function unpause() public onlyRole(PAUSER_ROLE) {
        _unpause();
    }

    function achievementMint() public whenNotPaused {
        uint256 _tokenId = tokenId.current();

        tokenType[_tokenId] = 0;

        // TO-DO: params of proof, verify sign from minter

        tokenId.increment();
        _safeMint(msg.sender, _tokenId);
    }

    function campaignMint(uint256 campaignId) public whenNotPaused {
        uint256 _tokenId = tokenId.current();

        tokenType[_tokenId] = 1;
        campaignIds[_tokenId] = campaignId;

        // TO-DO: params of proof, verify sign from minter

        tokenId.increment();
        _safeMint(msg.sender, _tokenId);
    }

    function _baseURI() internal view override returns (string memory) {
        return baseTokenURI;
    }

    function setBaseTokenURL(string memory _baseTokenURI) public onlyRole(DEFAULT_ADMIN_ROLE) {
        baseTokenURI = _baseTokenURI;
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        _requireMinted(_tokenId);

        string memory baseURI = _baseURI();
        return bytes(baseURI).length > 0 ? string(abi.encodePacked(baseURI, _tokenId.toString(), baseExtension)) : "";
    }

    function _beforeTokenTransfer(address from, address to, uint256 _tokenId, uint256 batchSize) internal override(ERC721Upgradeable, ERC721EnumerableUpgradeable) whenNotPaused {
        super._beforeTokenTransfer(from, to, _tokenId, batchSize);
    }

    function _burn(uint256 _tokenId) internal override(ERC721Upgradeable) {
        super._burn(_tokenId);
    }

    function supportsInterface(bytes4 interfaceId) public view override(ERC721Upgradeable, ERC721EnumerableUpgradeable, AccessControlUpgradeable) returns (bool) {
        return super.supportsInterface(interfaceId);
    }
}
