// src/App.js
import React, { useState } from "react";
import "./App.css";
import WalletConnect from "./components/WalletConnect";  // Import the WalletConnect component
import PlaceBet from "./components/PlaceBet";  // Import the PlaceBet component

function App() {

  return (
    <div className="container">
      <h1>Sports Betting DApp</h1>

      {/* Wallet Connection Component */}
      <WalletConnect />

      {/* Betting Component */}
      <PlaceBet />
    </div>
  );
}

export default App;