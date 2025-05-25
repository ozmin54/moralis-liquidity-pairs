import React, { useEffect, useState } from 'react';

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

interface MoralisLiquidityPairsProps {
  tokenAddress: string;
  apiKey: string;
}

export const MoralisLiquidityPairs: React.FC<MoralisLiquidityPairsProps> = ({ tokenAddress, apiKey }) => {
  const [pairs, setPairs] = useState<Pair[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    fetch(`https://deep-index.moralis.io/api/v2.2/erc20/${tokenAddress}/pairs?chain=eth`, {
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
          throw new Error('Token not found. Please enter a valid Ethereum token address.');
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
  }, [tokenAddress, apiKey]);

  if (loading) {
    return (
      <div style={{ textAlign: 'center', padding: '2rem' }}>
        <div style={{ 
          display: 'inline-block',
          padding: '1rem 2rem',
          background: '#EBF8FF',
          borderRadius: '4px',
          color: '#2B6CB0'
        }}>
          Loading liquidity pairs...
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ 
        padding: '1rem',
        background: '#FFF5F5',
        borderRadius: '4px',
        color: '#C53030',
        marginBottom: '1rem'
      }}>
        Error: {error}
      </div>
    );
  }

  if (!pairs.length) {
    return (
      <div style={{ 
        padding: '1rem',
        background: '#F7FAFC',
        borderRadius: '4px',
        color: '#4A5568',
        textAlign: 'center'
      }}>
        No liquidity pairs found for this token.
      </div>
    );
  }

  return (
    <div>
      <h2 style={{ 
        color: '#2D3748',
        marginBottom: '1.5rem',
        fontSize: '1.5rem'
      }}>
        Liquidity Pairs
      </h2>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ 
          width: '100%',
          borderCollapse: 'collapse',
          background: 'white'
        }}>
          <thead>
            <tr style={{ 
              background: '#F7FAFC',
              borderBottom: '2px solid #E2E8F0'
            }}>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Exchange</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Pair</th>
              <th style={{ padding: '1rem', textAlign: 'left' }}>Token</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>USD Price</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>24h Change</th>
              <th style={{ padding: '1rem', textAlign: 'right' }}>Liquidity (USD)</th>
            </tr>
          </thead>
          <tbody>
            {pairs.map(pair => (
              <tr key={pair.pair_address} className="table-row" style={{ 
                borderBottom: '1px solid #E2E8F0'
              }}>
                <td style={{ padding: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    {pair.exchange_logo && (
                      <img 
                        src={pair.exchange_logo} 
                        alt={pair.exchange_name}
                        style={{ width: '24px', height: '24px', borderRadius: '4px' }}
                      />
                    )}
                    {pair.exchange_name}
                  </div>
                </td>
                <td style={{ padding: '1rem' }}>{pair.pair_label}</td>
                <td style={{ padding: '1rem' }}>
                  {pair.pair.map(token => (
                    <div key={token.token_address} style={{ marginBottom: '0.5rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                        {token.token_logo && (
                          <img 
                            src={token.token_logo} 
                            alt={token.token_name}
                            style={{ width: '24px', height: '24px', borderRadius: '4px' }}
                          />
                        )}
                        <span>{token.token_symbol}</span>
                      </div>
                      <div style={{ 
                        fontSize: '0.75rem',
                        color: '#718096',
                        fontFamily: 'monospace'
                      }}>
                        {token.token_address}
                      </div>
                    </div>
                  ))}
                </td>
                <td style={{ 
                  padding: '1rem',
                  textAlign: 'right',
                  fontFamily: 'monospace'
                }}>
                  ${pair.usd_price.toFixed(6)}
                </td>
                <td style={{ 
                  padding: '1rem',
                  textAlign: 'right',
                  fontFamily: 'monospace',
                  color: pair.usd_price_24hr_percent_change >= 0 ? '#48BB78' : '#F56565'
                }}>
                  {pair.usd_price_24hr_percent_change >= 0 ? '+' : ''}
                  {pair.usd_price_24hr_percent_change.toFixed(2)}%
                </td>
                <td style={{ 
                  padding: '1rem',
                  textAlign: 'right',
                  fontFamily: 'monospace'
                }}>
                  ${pair.liquidity_usd.toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}; 