import React, { useState } from 'react';
import './App.css';
import { MoralisLiquidityPairs } from 'moralis-liquidity-pairs';

function App() {
  const [tokenAddress, setTokenAddress] = useState('');
  const [chain, setChain] = useState<'eth' | 'bsc'>('eth');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Moralis Liquidity Pairs Test</h1>
        <div className="test-container">
          <div style={{ marginBottom: '20px' }}>
            <select 
              value={chain} 
              onChange={(e) => setChain(e.target.value as 'eth' | 'bsc')}
              style={{
                padding: '10px',
                marginRight: '10px',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            >
              <option value="eth">Ethereum</option>
              <option value="bsc">BSC</option>
            </select>
            <input
              type="text"
              placeholder="Token adresini girin"
              value={tokenAddress}
              onChange={(e) => setTokenAddress(e.target.value)}
              style={{
                padding: '10px',
                width: '300px',
                fontSize: '16px',
                borderRadius: '4px',
                border: '1px solid #ccc'
              }}
            />
          </div>
          {tokenAddress && (
            <MoralisLiquidityPairs
              tokenAddress={tokenAddress}
              apiKey="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImVmYzM1YWI4LWExYjctNDk0Ny1iNWFmLWJhNjg3NjgzYjRlOSIsIm9yZ0lkIjoiNDQ5MTEyIiwidXNlcklkIjoiNDYyMDg2IiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiJlOTI0ZTVlNS04ZjE0LTRhNjYtYjJiMy1kNDU4OWQ1YjY5ZWIiLCJpYXQiOjE3NDgxODgxMzcsImV4cCI6NDkwMzk0ODEzN30.NibxenaAqX1DBpeGmba0OC4firN40Yv9E7d3_ED2x5o"
              chain={chain}
            />
          )}
        </div>
      </header>
    </div>
  );
}

export default App;
