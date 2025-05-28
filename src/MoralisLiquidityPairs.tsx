import React, { useEffect, useState } from 'react';
import './MoralisLiquidityPairs.css';

export interface Token {
  token_address: string;
  token_name: string;
  token_symbol: string;
  token_logo: string;
  token_decimals: string;
  pair_token_type: string;
  liquidity_usd: number;
}

export interface Pair {
  exchange_address: string;
  exchange_name: string;
  exchange_logo: string;
  pair_label: string;
  pair_address: string;
  from_address_entity_logo: string;
  usd_price: number;
  usd_price_24hr_percent_change: number;
  usd_price_24hr_usd_change: number;
  liquidity_usd: number;
  base_token: string;
  quote_token: string;
  pair: Token[];
}

export interface ApiResponse {
  cursor: string;
  page_size: number;
  page: number;
  pairs: Pair[];
}

export interface MoralisLiquidityPairsProps {
  tokenAddress: string;
  apiKey: string;
  chain?: 'eth' | 'bsc';
}

export const MoralisLiquidityPairs: React.FC<MoralisLiquidityPairsProps> = ({ tokenAddress, apiKey, chain = 'eth' }) => {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://deep-index.moralis.io/api/v2.2/erc20/${tokenAddress}/pairs?chain=${chain}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'X-API-Key': apiKey
      }
    })
      .then(res => {
        if (res.status === 401) {
          throw new Error('Invalid API key or authorization error. Please check your API key.');
        }
        if (res.status === 404) {
          throw new Error('Token not found. Please enter a valid token address.');
        }
        if (!res.ok) throw new Error(`API error: ${res.status} - ${res.statusText}`);
        return res.json();
      })
      .then((data: ApiResponse) => {
        if (!data.pairs || !Array.isArray(data.pairs)) {
          throw new Error('Invalid API response format');
        }
        setPairs(data.pairs);
        setLoading(false);
      })
      .catch((err: any) => {
        setError(err.message || 'Error fetching liquidity pairs');
        setLoading(false);
      });
  }, [tokenAddress, apiKey, chain]);

  if (loading) {
    return <div style={{ textAlign: 'center', padding: '2rem' }}>Loading liquidity pairs...</div>;
  }

  if (error) {
    return <div style={{ color: 'red', textAlign: 'center', padding: '1rem' }}>Error: {error}</div>;
  }

  if (!pairs.length) {
    return <div style={{ textAlign: 'center', padding: '1rem' }}>No liquidity pairs found for this token.</div>;
  }

  return (
    <div style={{ marginTop: 32 }}>
      <h2 style={{ textAlign: 'left', marginBottom: 16 }}>Liquidity Pairs</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' }}>
        <thead>
          <tr style={{ background: '#f5f6fa', color: '#222', fontWeight: 600 }}>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>Exchange</th>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>Pair</th>
            <th style={{ padding: '12px 16px', textAlign: 'left' }}>Token</th>
            <th style={{ padding: '12px 16px', textAlign: 'right' }}>USD Price</th>
            <th style={{ padding: '12px 16px', textAlign: 'right' }}>24h Change</th>
            <th style={{ padding: '12px 16px', textAlign: 'right' }}>Liquidity (USD)</th>
          </tr>
        </thead>
        <tbody>
          {pairs.map(pair => (
            <tr key={pair.pair_address} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8 }}>
                {pair.exchange_logo && (
                  <img src={pair.exchange_logo} alt={pair.exchange_name} style={{ width: 24, height: 24, borderRadius: 4, marginRight: 8 }} />
                )}
                {pair.exchange_name}
              </td>
              <td style={{ padding: '12px 16px' }}>{pair.pair_label}</td>
              <td style={{ padding: '12px 16px' }}>
                {pair.pair.map(token => (
                  <div key={token.token_address} style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 }}>
                    {token.token_logo && (
                      <img src={token.token_logo} alt={token.token_symbol} style={{ width: 20, height: 20, borderRadius: 4 }} />
                    )}
                    <span style={{ fontWeight: 500 }}>{token.token_symbol}</span>
                    <span style={{ color: '#888', fontSize: 12, marginLeft: 4 }}>{token.token_address}</span>
                  </div>
                ))}
              </td>
              <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace' }}>
                ${pair.usd_price.toFixed(6)}
              </td>
              <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace', color: pair.usd_price_24hr_percent_change >= 0 ? '#48BB78' : '#F56565' }}>
                {pair.usd_price_24hr_percent_change >= 0 ? '+' : ''}{pair.usd_price_24hr_percent_change.toFixed(2)}%
              </td>
              <td style={{ padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace' }}>
                ${pair.liquidity_usd.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}; 