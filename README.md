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
  const [chain, setChain] = useState<'eth' | 'bsc'>('eth');

  return (
    <div className="App">
      <header className="App-header">
        <h1>Moralis Liquidity Pairs</h1>
        <div className="search-container">
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
            chain={chain}
          />
        )}
      </header>
    </div>
  );
}
```

### Example Token Addresses

#### Ethereum Mainnet
- PEPE Token: `0x6982508145454ce325ddbe47a25d4ec3d2311933`
- USDT: `0xdac17f958d2ee523a2206206994597c13d831ec7`
- USDC: `0xa0b86991c6218b36c1d19d4a2e9eb0ce3606eb48`
- WETH: `0xc02aaa39b223fe8d0a0e5c4f27ead9083c756cc2`

#### BSC (Binance Smart Chain)
- BUSD: `0xe9e7CEA3DedcA5984780Bafc599bD69ADd087D56`
- CAKE: `0x0E09FaBB73Bd3Ade0a17ECC321fD13a19e81cE82`
- WBNB: `0xbb4CdB9CBd36B01bD1cBaEBF2De08d9173bc095c`

## Features
- Displays token liquidity pairs
- Shows exchange logos
- Displays token logos
- Shows 24-hour price changes
- Shows USD prices
- Shows liquidity amounts
- Includes a search input for token addresses
- Supports multiple networks (Ethereum and BSC)

## Network Support
Currently supported networks:
- Ethereum Mainnet (eth)
- BSC (Binance Smart Chain) (bsc)

### Planned Network Support
- Polygon
- Avalanche
- Arbitrum
- Optimism

## Requirements
- React 16.8 or higher
- Moralis API key

## License
MIT 