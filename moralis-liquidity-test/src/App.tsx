import React, { useState } from 'react';
import { MoralisLiquidityPairs } from 'moralis-liquidity-pairs';
import './App.css';

function App() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [showPairs, setShowPairs] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPairs(true);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Moralis Liquidity Pairs Test</h1>
        
        <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
          <div style={{ marginBottom: '1rem' }}>
            <label htmlFor="tokenAddress" style={{ marginRight: '1rem' }}>
              Token Address:
            </label>
            <input
              id="tokenAddress"
              type="text"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              placeholder="Enter token address (e.g., 0x6982508145454ce325ddbe47a25d4ec3d2311933)"
              style={{ padding: '0.5rem', width: '400px' }}
            />
          </div>
          <button type="submit" style={{ padding: '0.5rem 1rem' }}>
            Show Liquidity Pairs
          </button>
        </form>

        {showPairs && (
          <div style={{ width: '100%', maxWidth: '1200px' }}>
            <MoralisLiquidityPairs
              tokenAddress={tokenAddress}
              apiKey="YOUR_MORALIS_API_KEY"
            />
          </div>
        )}
      </header>
    </div>
  );
}

export default App;
