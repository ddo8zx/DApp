import React, { useState } from 'react';
import Web3 from 'web3'; // Import Web3.js

const PlaceBet = () => {
  const [team, setTeam] = useState('');
  const [amount, setAmount] = useState('');
  const [account, setAccount] = useState(''); // Store user's wallet address
  const [contract, setContract] = useState(null); // Store contract instance
  const [web3, setWeb3] = useState(null); // Store Web3 instance
  const [resultMessage, setResultMessage] = useState(''); // Store result message

  // ABI and Contract Address from your deployment
  const contractABI = [
    {
      "inputs": [],
      "stateMutability": "nonpayable",
      "type": "constructor"
    },
    {
      "anonymous": false,
      "inputs": [
        {
          "indexed": true,
          "internalType": "address",
          "name": "bettor",
          "type": "address"
        },
        {
          "indexed": false,
          "internalType": "string",
          "name": "team",
          "type": "string"
        },
        {
          "indexed": false,
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "name": "BetPlaced",
      "type": "event"
    },
    {
      "inputs": [],
      "name": "bank",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "name": "bets",
      "outputs": [
        {
          "internalType": "address",
          "name": "bettor",
          "type": "address"
        },
        {
          "internalType": "string",
          "name": "team",
          "type": "string"
        },
        {
          "internalType": "uint256",
          "name": "amount",
          "type": "uint256"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "owner",
      "outputs": [
        {
          "internalType": "address",
          "name": "",
          "type": "address"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "payout",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_team",
          "type": "string"
        }
      ],
      "name": "placeBet",
      "outputs": [],
      "stateMutability": "payable",
      "type": "function"
    },
    {
      "inputs": [
        {
          "internalType": "string",
          "name": "_team",
          "type": "string"
        }
      ],
      "name": "setWinner",
      "outputs": [],
      "stateMutability": "nonpayable",
      "type": "function"
    },
    {
      "inputs": [],
      "name": "winner",
      "outputs": [
        {
          "internalType": "string",
          "name": "",
          "type": "string"
        }
      ],
      "stateMutability": "view",
      "type": "function"
    }
  ];
  const contractAddress = '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC';
  
 
  React.useEffect(() => {
    if (window.ethereum) {
      const web3Instance = new Web3(window.ethereum);
      setWeb3(web3Instance);
      const contractInstance = new web3Instance.eth.Contract(contractABI, contractAddress);
      setContract(contractInstance);
      // Get the user's wallet address
      window.ethereum.request({ method: 'eth_requestAccounts' }).then(accounts => {
        setAccount(accounts[0]);
      });
    } else {
      alert('Please install MetaMask');
    }
  }, []);

  const handleBet = async (e) => {
    e.preventDefault();

    if (!team || !amount || !web3 || !contract || !account) {
      console.error("Missing necessary information to place bet");
      return;
    }

    const betAmount = web3.utils.toWei(amount, 'ether'); // Convert bet amount to Wei

    try {
      // Call the placeBet function on the contract
      await contract.methods.placeBet(team).send({
        from: account,
        value: betAmount,
      });
      console.log(`Bet placed on ${team} with amount: ${amount} ETH`);
      if (team === '49ers') {
        setResultMessage('The 49ers lost!');
      }
    } catch (error) {
      console.error("Error placing bet: ", error);
    }
  };

  return (
    <form onSubmit={handleBet}>
      <h3>Choose Your Team</h3>
      <div>
        <button type="button" onClick={() => setTeam('Chiefs')}>Chiefs</button>
        <button type="button" onClick={() => setTeam('49ers')}>49ers</button>
      </div>
      <label>
        Bet Amount (in ETH):
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
          required
        />
      </label>
      <button type="submit">Place Bet</button>
      {resultMessage && <p>{resultMessage}</p>}
    </form>
  );
};

export default PlaceBet;