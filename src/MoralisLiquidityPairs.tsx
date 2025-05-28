import React, { useState, useEffect } from 'react';
import './MoralisLiquidityPairs.css';

export interface MoralisLiquidityPairsProps {
  tokenAddress: string;
  apiKey: string;
  chain?: 'eth' | 'bsc'; // Add chain prop with supported networks
}

interface Pair {
  pairAddress: string;
  exchange: string;
  priceUsd: string;
  priceChange24h: string;
  liquidity: {
    usd: string;
  };
  token0: {
    address: string;
    symbol: string;
    logo: string;
  };
  token1: {
    address: string;
    symbol: string;
    logo: string;
  };
}

export const MoralisLiquidityPairs: React.FC<MoralisLiquidityPairsProps> = ({
  tokenAddress,
  apiKey,
  chain = 'eth' // Default to Ethereum if not specified
}) => {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPairs = async () => {
      try {
        setLoading(true);
        setError(null);
        fetch(`https://deep-index.moralis.io/api/v2.2/erc20/${tokenAddress}/pairs?chain=${chain}`, {
          method: 'GET',
          headers: {
            accept: 'application/json',
            'X-API-Key': apiKey
          }
        })
          .then(response => {
            if (!response.ok) {
              if (response.status === 404) {
                throw new Error('Token not found. Please enter a valid token address.');
              }
              throw new Error('Failed to fetch liquidity pairs');
            }
            return response.json();
          })
          .then(data => {
            setPairs(data);
            setLoading(false);
          })
          .catch(error => {
            setError(error.message);
            setLoading(false);
          });
      } catch (error) {
        setError('An error occurred while fetching data');
        setLoading(false);
      }
    };

    if (tokenAddress) {
      fetchPairs();
    }
  }, [tokenAddress, apiKey, chain]);

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (error) {
    return <div className="error">{error}</div>;
  }

  if (!pairs.length) {
    return <div className="no-pairs">No liquidity pairs found for this token</div>;
  }

  return (
    <div className="pairs-container">
      <h2>Liquidity Pairs</h2>
      <div className="pairs-grid">
        {pairs.map((pair) => (
          <div key={pair.pairAddress} className="pair-card">
            <div className="pair-header">
              <img src={pair.token0.logo} alt={pair.token0.symbol} className="token-logo" />
              <span className="pair-symbols">
                {pair.token0.symbol}/{pair.token1.symbol}
              </span>
              <img src={pair.token1.logo} alt={pair.token1.symbol} className="token-logo" />
            </div>
            <div className="pair-details">
              <div className="detail-item">
                <span className="label">Exchange:</span>
                <span className="value">{pair.exchange}</span>
              </div>
              <div className="detail-item">
                <span className="label">Price (USD):</span>
                <span className="value">${parseFloat(pair.priceUsd).toFixed(6)}</span>
              </div>
              <div className="detail-item">
                <span className="label">24h Change:</span>
                <span className={`value ${parseFloat(pair.priceChange24h) >= 0 ? 'positive' : 'negative'}`}>
                  {parseFloat(pair.priceChange24h).toFixed(2)}%
                </span>
              </div>
              <div className="detail-item">
                <span className="label">Liquidity (USD):</span>
                <span className="value">${parseFloat(pair.liquidity.usd).toLocaleString()}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}; 