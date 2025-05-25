import React, { useState } from 'react';
import { MoralisLiquidityPairs } from './MoralisLiquidityPairs';

const MORALIS_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImVmYzM1YWI4LWExYjctNDk0Ny1iNWFmLWJhNjg3NjgzYjRlOSIsIm9yZ0lkIjoiNDQ5MTEyIiwidXNlcklkIjoiNDYyMDg2IiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiJlOTI0ZTVlNS04ZjE0LTRhNjYtYjJiMy1kNDU4OWQ1YjY5ZWIiLCJpYXQiOjE3NDgxODgxMzcsImV4cCI6NDkwMzk0ODEzN30.NibxenaAqX1DBpeGmba0OC4firN40Yv9E7d3_ED2x5o';

const App: React.FC = () => {
  const [tokenAddress, setTokenAddress] = useState('');
  const [showPairs, setShowPairs] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);
    setShowPairs(true);
  };

  return (
    <div style={{ 
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      fontFamily: 'system-ui, -apple-system, sans-serif'
    }}>
      <h1 style={{ 
        color: '#2D3748',
        marginBottom: '2rem',
        fontSize: '2rem',
        textAlign: 'center'
      }}>
        Token Likidite Çiftleri
      </h1>

      {apiError && (
        <div style={{
          padding: '1rem',
          marginBottom: '1rem',
          background: '#FFF5F5',
          borderRadius: '4px',
          color: '#C53030'
        }}>
          {apiError}
        </div>
      )}

      <form onSubmit={handleSubmit} style={{
        marginBottom: '2rem',
        background: 'white',
        padding: '1.5rem',
        borderRadius: '8px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
      }}>
        <div style={{ marginBottom: '1rem' }}>
          <label htmlFor="tokenAddress" style={{
            display: 'block',
            marginBottom: '0.5rem',
            color: '#4A5568',
            fontWeight: '500'
          }}>
            Token Adresi
          </label>
          <input
            id="tokenAddress"
            type="text"
            value={tokenAddress}
            onChange={(e) => setTokenAddress(e.target.value)}
            placeholder="Token adresini girin (örn: 0x6982508145454ce325ddbe47a25d4ec3d2311933)"
            className="token-input"
            style={{
              width: '100%',
              padding: '0.75rem',
              border: '1px solid #E2E8F0',
              borderRadius: '4px',
              fontSize: '1rem'
            }}
            required
          />
        </div>
        <button
          type="submit"
          className="fetch-button"
          style={{
            background: '#4299E1',
            color: 'white',
            padding: '0.75rem 1.5rem',
            border: 'none',
            borderRadius: '4px',
            fontSize: '1rem',
            cursor: 'pointer',
            width: '100%'
          }}
        >
          Likidite Çiftlerini Getir
        </button>
      </form>

      {showPairs && !apiError && (
        <MoralisLiquidityPairs
          tokenAddress={tokenAddress}
          apiKey={MORALIS_API_KEY}
        />
      )}
    </div>
  );
};

export default App; 