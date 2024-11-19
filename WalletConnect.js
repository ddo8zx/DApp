// src/components/WalletConnect.js
import React, { useState, useEffect } from 'react';
import Web3 from 'web3';

const WalletConnect = () => {
  const [account, setAccount] = useState('');

  // Function to connect to MetaMask
  const connectWallet = async () => {
    if (window.ethereum) {
      const web3 = new Web3(window.ethereum);
      try {
        // Request account access if needed
        await window.ethereum.enable();
        // Get the user's Ethereum account(s)
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
      } catch (error) {
        console.error("User denied account access...");
      }
    } else {
      console.error("MetaMask not detected!");
    }
  };

  useEffect(() => {
    // Auto-connect to wallet if already connected
    if (window.ethereum) {
      window.ethereum.on('accountsChanged', function (accounts) {
        setAccount(accounts[0]);
      });
    }
  }, []);

  return (
    <div>
      {account ? (
        <p>Connected Wallet: {account}</p>
      ) : (
        <button onClick={connectWallet}>Connect Wallet</button>
      )}
    </div>
  );
};

export default WalletConnect;