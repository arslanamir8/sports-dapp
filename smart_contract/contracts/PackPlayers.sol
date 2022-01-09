// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@chainlink/contracts/src/v0.8/VRFConsumerBase.sol";
import "@chainlink/contracts/src/v0.8/ConfirmedOwner.sol";


contract packPlayers is VRFConsumerBase, ConfirmedOwner(msg.sender){

    //vrf initialization
    uint256 private constant ROLL_IN_PROGRESS = 42;
    bytes32 private s_keyHash;
    uint256 private s_fee;
    mapping(bytes32 => address) private s_rollers;
    mapping(address => uint256) private s_results;
    uint256 public value;


    event DiceRolled(bytes32 indexed requestId, address indexed roller);
    event DiceLanded(bytes32 indexed requestId, uint256 indexed result);


    //VRF constructor
    constructor(address vrfCoordinator, address link, bytes32 keyHash, uint256 fee)
        VRFConsumerBase(vrfCoordinator, link)
    {
        s_keyHash = keyHash;
        s_fee = fee;
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

    function fulfillRandomness(bytes32 requestId, uint256 randomness) internal override {
        uint256 d20Value = randomness % 10 + 1;
        s_results[s_rollers[requestId]] = d20Value;
        emit DiceLanded(requestId, d20Value);
    }

    //Player function
    function player(address owner) public view returns (string memory) {
        require(s_results[owner] != 0, "Dice not rolled");
        require(s_results[owner] != ROLL_IN_PROGRESS, "Roll in progress");
        return getPlayer(s_results[owner]);
    }
    
    //getPlayer
    function getPlayer(uint256 id) private pure returns (string memory) {
    string[10] memory playerNames = ['LeBron James', 'Kevin Durant', 'Kawhi Leonard', 
                                        'Ben Simmons', 'Alperen Sengun', 'Joel Embiid', 'Tyrese Maxey', 
                                        'Lonzo Ball', 'Lamelo Ball', 'LaVar Ball'];
        return playerNames[id - 1];
    }

    function buy(address roller) public payable {
        value = msg.value;
        rollDice(roller);
    }
}