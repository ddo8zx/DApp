// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract Betting {
    
    address public bank = 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC;
    address public user = 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266;
    
    address public owner;

    struct Bet {
        address bettor;
        string team;
        uint256 amount;
    }

    mapping(address => Bet) public bets;

    event BetPlaced(address indexed bettor, string team, uint256 amount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can fund the contract");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    // Place a bet on a team
    function placeBet(string memory _team) public payable {
        require(msg.value > 0, "You must bet a positive amount");
        require(bytes(_team).length > 0, "You must select a team");

        bets[msg.sender] = Bet(msg.sender, _team, msg.value);
        emit BetPlaced(msg.sender, _team, msg.value);
    }

    // Payout the bets
    function payout() public {
        Bet memory userBet = bets[msg.sender];
        require(userBet.amount > 0, "You have not placed a bet");

        // If the user bet on the Chiefs, transfer from bank to user
        if (keccak256(bytes(userBet.team)) == keccak256(bytes("Chiefs"))) {
            require(address(bank).balance >= userBet.amount, "Bank does not have enough funds to payout");
            payable(user).transfer(userBet.amount); // Transfer from bank to user
        }
        // If the user bet on the 49ers, transfer from user to bank
        else if (keccak256(bytes(userBet.team)) == keccak256(bytes("49ers"))) {
            payable(bank).transfer(userBet.amount); // Transfer from user to bank
        }

        // Reset the user's bet after payout
        delete bets[msg.sender];
    }

    // Function to fund the contract by the bank (hardcoded)
    function fundContract() external payable onlyOwner {
        require(msg.sender == bank, "Only the bank can fund the contract");
    }
}
