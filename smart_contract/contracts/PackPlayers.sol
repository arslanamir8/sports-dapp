// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";


contract PackPlayers is ERC1155, VRFConsumerBase, ConfirmedOwner(msg.sender){

    //vrf init
    uint256 private constant ROLL_IN_PROGRESS = 42;
    bytes32 private s_keyHash;
    uint256 private s_fee;
    mapping(bytes32 => address) private s_rollers;
    mapping(address => uint256) private s_results;
    mapping(address => string[]) public holdings;
    mapping(uint => bool) private exists;
    uint256 public value;

    //token id => player mapping
    string[20] playerNamess = ['LeBron James', 'Kevin Durant', 'Kawhi Leonard', 
                                            'Ben Simmons', 'Alperen Sengun', 'Joel Embiid', 'Tyrese Maxey', 
                                            'Lonzo Ball', 'Lamelo Ball', 'LaVar Ball', 'Tyrese Haliburton',
                                            'Robert Williams III', 'Kevin Porter Jr.', 'Jaren Jackson Jr.',
                                            'Evan Mobley', 'Cade Cunningham', 'Jalen Green', 'Scottie Barnes',
                                            'Anthony Edwards', 'Jalen Suggs'];
    mapping(uint256 => string) public id_to_player;
    
    //event capture
    event DiceRolled(bytes32 indexed requestId, address indexed roller);
    event DiceLanded(bytes32 indexed requestId, uint256 indexed result);
    event Packed(address owner);


    //mint machine
    constructor() ERC1155("https://game.example/api/item/{id}.json") 
    VRFConsumerBase(0xdD3782915140c8f3b190B5D67eAc6dc5760C46E9, 0xa36085F69e2889c224210F603D836748e7dC0088) {
        for (uint256 i = 0; i < 20; i++) {
            _mint(msg.sender, i, 100, "");
        }

        for (uint256 i = 0; i < playerNamess.length; i++) {
            id_to_player[i] = playerNamess[i];
        }

        s_keyHash = 0x6c3699283bda56ad74f6b855546325b68d482e983852a7a82979cc4807b641f4;
        s_fee = 100000000000000000;
    }

    //Roll random functions
    function rollDice(address roller) internal onlyOwner returns (bytes32 requestId) {
        // checking LINK balance
        require(LINK.balanceOf(address(this)) >= s_fee, "Not enough LINK to pay fee");

        // requesting randomness
        requestId = requestRandomness(s_keyHash, s_fee);

        // storing requestId and roller address
        s_rollers[requestId] = roller;

        // emitting event to signal rolling of die
        s_results[roller] = ROLL_IN_PROGRESS;
        emit DiceRolled(requestId, roller);
    }

    // ∃!Player ∀Player ∈ Packed Players
    function duplicatefinder(uint256 intermediate, uint256[] memory expandedValues, uint256 i) internal {
        if(exists[intermediate] == false){
            expandedValues[i] = intermediate;
            exists[intermediate] = true;
        } else {
            intermediate += 1 % 20;
            duplicatefinder(intermediate, expandedValues, i);
        }
    }

    //extrapolate n random numbers from a single chainlink request
    function expand(uint256 randomValue, uint256 n) internal returns (uint256[] memory expandedValues) {
        expandedValues = new uint256[](n);
        for (uint256 i = 0; i < n; i++) {
            uint256 intermediate;
            intermediate = uint256(keccak256(abi.encode(randomValue, i))) % 20 + 1;
            duplicatefinder(intermediate, expandedValues, i);
        }
        return expandedValues;
    }

    //chainlink vrfconsumer
    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        uint256 d20Value = randomness % 20;
        s_results[s_rollers[requestId]] = d20Value;
        emit DiceLanded(requestId, d20Value);
    }

    //Player return container
    function player(address owner) public returns (string[] memory) {
        require(s_results[owner] != 0, "Dice not rolled");
        require(s_results[owner] != ROLL_IN_PROGRESS, "Roll in progress");
        return getPlayer(s_results[owner], owner);
    }
    
    //getPlayer
    function getPlayer(uint256 rand, address owner) internal returns (string[] memory) {
        string[20] memory playerNames = ['LeBron James', 'Kevin Durant', 'Kawhi Leonard', 
                                            'Ben Simmons', 'Alperen Sengun', 'Joel Embiid', 'Tyrese Maxey', 
                                            'Lonzo Ball', 'Lamelo Ball', 'LaVar Ball', 'Tyrese Haliburton',
                                            'Robert Williams III', 'Kevin Porter Jr.', 'Jaren Jackson Jr.',
                                            'Evan Mobley', 'Cade Cunningham', 'Jalen Green', 'Scottie Barnes',
                                            'Anthony Edwards', 'Jalen Suggs'];
        uint256[] memory expanded = expand(rand, 5);
        for(uint256 i = 0; i < expanded.length; i++){
            holdings[owner].push(playerNames[expanded[i] - 1]);
        }
        emit Packed(owner);
        return holdings[owner];
        }

    //buy a pack
    function buy(address roller) public payable {
        value = msg.value;
        rollDice(roller);
    }

    //clear packed (only for dev)
    function clearPackedPlayers(address owner) public{
        delete holdings[owner];
    }

    //get players view function
    function getPlayers(address owner) public view returns (string[] memory) {
        return holdings[owner];
    }
}