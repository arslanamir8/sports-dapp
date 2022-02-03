// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";

contract PlayerTokens is ERC1155 {
    uint256 public constant LeBron_James = 0;
    uint256 public constant Kevin_Durant = 1;
    uint256 public constant Kawhi_Leonard = 2;
    uint256 public constant Ben_Simmons = 3;
    uint256 public constant Alperen_Sengun = 4;
    uint256 public constant Joel_Embiid = 5;
    uint256 public constant Tyrese_Maxey = 6;
    uint256 public constant Lonzo_Ball = 7;
    uint256 public constant LaMelo_Ball = 8;
    uint256 public constant LaVar_Ball = 9;
    uint256 public constant Tyrese_Haliburton = 10;
    uint256 public constant Robert_Williams_II = 11;
    uint256 public constant Kevin_Porter_Jr = 12;
    uint256 public constant Jaren_Jackson_Jr = 13;
    uint256 public constant Evan_Mobley = 14;
    uint256 public constant Cade_Cunningham = 15;
    uint256 public constant Jalen_Green = 16;
    uint256 public constant Scottie_Barnes = 17;
    uint256 public constant Anthony_Edwards = 18;
    uint256 public constant Jalen_Suggs = 19;

    constructor() public ERC1155("https://game.example/api/item/{id}.json") {
        _mint(msg.sender, LeBron_James, 100, "");
        _mint(msg.sender, Kevin_Durant, 100, "");
        _mint(msg.sender, Kawhi_Leonard, 100, "");
        _mint(msg.sender, Ben_Simmons, 100, "");
        _mint(msg.sender, Alperen_Sengun, 100, "");
        _mint(msg.sender, Joel_Embiid, 100, "");
        _mint(msg.sender, Tyrese_Maxey, 100, "");
        _mint(msg.sender, Lonzo_Ball, 100, "");
        _mint(msg.sender, LaMelo_Ball, 100, "");
        _mint(msg.sender, LaVar_Ball, 100, "");
        _mint(msg.sender, Tyrese_Haliburton, 100, "");
        _mint(msg.sender, Robert_Williams_II, 100, "");
        _mint(msg.sender, Kevin_Porter_Jr, 100, "");
        _mint(msg.sender, Jaren_Jackson_Jr, 100, "");
        _mint(msg.sender, Evan_Mobley, 100, "");
        _mint(msg.sender, Cade_Cunningham, 100, "");
        _mint(msg.sender, Jalen_Green, 100, "");
        _mint(msg.sender, Scottie_Barnes, 100, "");
        _mint(msg.sender, Anthony_Edwards, 100, "");
        _mint(msg.sender, Jalen_Suggs, 100, "");

    }
}