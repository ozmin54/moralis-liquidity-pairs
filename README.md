# Moralis Liquidity Pairs

A React component library for displaying token liquidity pairs using the Moralis API.

## Installation

```bash
npm install moralis-liquidity-pairs
```

## Usage

```tsx
import { MoralisLiquidityPairs } from 'moralis-liquidity-pairs';

function App() {
  return (
    <MoralisLiquidityPairs
      tokenAddress="ENTER_TOKEN_ADDRESS_HERE"
      apiKey="YOUR_MORALIS_API_KEY"
    />
  );
}
```

## Features

- Display token liquidity pairs
- Exchange logos
- Token logos
- 24-hour price changes
- USD prices
- Liquidity amounts

## Requirements

- React 16.8 or higher
- Moralis API key

## License

MIT 