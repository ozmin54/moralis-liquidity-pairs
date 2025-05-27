# Moralis Liquidity Pairs

A React component library for displaying token liquidity pairs using the Moralis API.

## Installation

```bash
npm install moralis-liquidity-pairs
```

## Usage

The component includes a search input where users can enter the token address. Here's how to use it:

```tsx
import { MoralisLiquidityPairs } from 'moralis-liquidity-pairs';

function App() {
  return (
    <MoralisLiquidityPairs
      apiKey="YOUR_MORALIS_API_KEY"
    />
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