# Moralis Liquidity Pairs

A React component library for displaying token liquidity pairs using the Moralis API.

## Installation

```bash
npm install moralis-liquidity-pairs
```

## Usage

Here's a complete example showing how to implement a search input for token addresses:

```tsx
import React, { useState } from 'react';
import { MoralisLiquidityPairs } from 'moralis-liquidity-pairs';

function App() {
  const [tokenAddress, setTokenAddress] = useState('');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Moralis Liquidity Pairs</h1>
        <div className="search-container">
          <input
            type="text"
            placeholder="Enter token address"
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
            apiKey="YOUR_MORALIS_API_KEY"
          />
        )}
      </header>
    </div>
  );
}
```

### Example Token Addresses
Here are some example token addresses you can use for testing:
- PEPE Token: `0x6982508145454ce325ddbe47a25d4ec3d2311933`
- USDT: `0xdac17f958d2ee523a2206206994597c13d831ec7`
- USDC: `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`
- WETH: `0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2`

## Features

- Display token liquidity pairs
- Exchange logos
- Token logos
- 24-hour price changes
- USD prices
- Liquidity amounts
- Includes a search input for token addresses

## Requirements

- React 16.8 or higher
- Moralis API key

## License

MIT 