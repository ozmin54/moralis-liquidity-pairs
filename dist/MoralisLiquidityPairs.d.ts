import React from 'react';
import './MoralisLiquidityPairs.css';
export interface MoralisLiquidityPairsProps {
    tokenAddress: string;
    apiKey: string;
    chain?: 'eth' | 'bsc';
}
export declare const MoralisLiquidityPairs: React.FC<MoralisLiquidityPairsProps>;
