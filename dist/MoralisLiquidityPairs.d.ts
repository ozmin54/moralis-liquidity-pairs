import React from 'react';
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
export declare const MoralisLiquidityPairs: React.FC<MoralisLiquidityPairsProps>;
