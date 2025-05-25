"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoralisLiquidityPairs = void 0;
var react_1 = __importStar(require("react"));
var MoralisLiquidityPairs = function (_a) {
    var tokenAddress = _a.tokenAddress, apiKey = _a.apiKey;
    var _b = (0, react_1.useState)([]), pairs = _b[0], setPairs = _b[1];
    var _c = (0, react_1.useState)(true), loading = _c[0], setLoading = _c[1];
    var _d = (0, react_1.useState)(null), error = _d[0], setError = _d[1];
    (0, react_1.useEffect)(function () {
        setLoading(true);
        setError(null);
        fetch("https://deep-index.moralis.io/api/v2.2/erc20/".concat(tokenAddress, "/pairs?chain=eth"), {
            method: 'GET',
            headers: {
                accept: 'application/json',
                'X-API-Key': apiKey
            }
        })
            .then(function (res) {
            if (res.status === 401) {
                throw new Error('Invalid API key or authorization error. Please check your API key.');
            }
            if (res.status === 404) {
                throw new Error('Token not found. Please enter a valid Ethereum token address.');
            }
            if (!res.ok)
                throw new Error("API error: ".concat(res.status, " - ").concat(res.statusText));
            return res.json();
        })
            .then(function (data) {
            if (!data.pairs || !Array.isArray(data.pairs)) {
                throw new Error('Invalid API response format');
            }
            setPairs(data.pairs);
            setLoading(false);
        })
            .catch(function (err) {
            setError(err.message || 'Error fetching liquidity pairs');
            setLoading(false);
        });
    }, [tokenAddress, apiKey]);
    if (loading) {
        return (react_1.default.createElement("div", { style: { textAlign: 'center', padding: '2rem' } },
            react_1.default.createElement("div", { style: {
                    display: 'inline-block',
                    padding: '1rem 2rem',
                    background: '#EBF8FF',
                    borderRadius: '4px',
                    color: '#2B6CB0'
                } }, "Loading liquidity pairs...")));
    }
    if (error) {
        return (react_1.default.createElement("div", { style: {
                padding: '1rem',
                background: '#FFF5F5',
                borderRadius: '4px',
                color: '#C53030',
                marginBottom: '1rem'
            } },
            "Error: ",
            error));
    }
    if (!pairs.length) {
        return (react_1.default.createElement("div", { style: {
                padding: '1rem',
                background: '#F7FAFC',
                borderRadius: '4px',
                color: '#4A5568',
                textAlign: 'center'
            } }, "No liquidity pairs found for this token."));
    }
    return (react_1.default.createElement("div", null,
        react_1.default.createElement("h2", { style: {
                color: '#2D3748',
                marginBottom: '1.5rem',
                fontSize: '1.5rem'
            } }, "Liquidity Pairs"),
        react_1.default.createElement("div", { style: { overflowX: 'auto' } },
            react_1.default.createElement("table", { style: {
                    width: '100%',
                    borderCollapse: 'collapse',
                    background: 'white'
                } },
                react_1.default.createElement("thead", null,
                    react_1.default.createElement("tr", { style: {
                            background: '#F7FAFC',
                            borderBottom: '2px solid #E2E8F0'
                        } },
                        react_1.default.createElement("th", { style: { padding: '1rem', textAlign: 'left' } }, "Exchange"),
                        react_1.default.createElement("th", { style: { padding: '1rem', textAlign: 'left' } }, "Pair"),
                        react_1.default.createElement("th", { style: { padding: '1rem', textAlign: 'left' } }, "Token"),
                        react_1.default.createElement("th", { style: { padding: '1rem', textAlign: 'right' } }, "USD Price"),
                        react_1.default.createElement("th", { style: { padding: '1rem', textAlign: 'right' } }, "24h Change"),
                        react_1.default.createElement("th", { style: { padding: '1rem', textAlign: 'right' } }, "Liquidity (USD)"))),
                react_1.default.createElement("tbody", null, pairs.map(function (pair) { return (react_1.default.createElement("tr", { key: pair.pair_address, className: "table-row", style: {
                        borderBottom: '1px solid #E2E8F0'
                    } },
                    react_1.default.createElement("td", { style: { padding: '1rem' } },
                        react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '0.5rem' } },
                            pair.exchange_logo && (react_1.default.createElement("img", { src: pair.exchange_logo, alt: pair.exchange_name, style: { width: '24px', height: '24px', borderRadius: '4px' } })),
                            pair.exchange_name)),
                    react_1.default.createElement("td", { style: { padding: '1rem' } }, pair.pair_label),
                    react_1.default.createElement("td", { style: { padding: '1rem' } }, pair.pair.map(function (token) { return (react_1.default.createElement("div", { key: token.token_address, style: { marginBottom: '0.5rem' } },
                        react_1.default.createElement("div", { style: { display: 'flex', alignItems: 'center', gap: '0.5rem' } },
                            token.token_logo && (react_1.default.createElement("img", { src: token.token_logo, alt: token.token_name, style: { width: '24px', height: '24px', borderRadius: '4px' } })),
                            react_1.default.createElement("span", null, token.token_symbol)),
                        react_1.default.createElement("div", { style: {
                                fontSize: '0.75rem',
                                color: '#718096',
                                fontFamily: 'monospace'
                            } }, token.token_address))); })),
                    react_1.default.createElement("td", { style: {
                            padding: '1rem',
                            textAlign: 'right',
                            fontFamily: 'monospace'
                        } },
                        "$",
                        pair.usd_price.toFixed(6)),
                    react_1.default.createElement("td", { style: {
                            padding: '1rem',
                            textAlign: 'right',
                            fontFamily: 'monospace',
                            color: pair.usd_price_24hr_percent_change >= 0 ? '#48BB78' : '#F56565'
                        } },
                        pair.usd_price_24hr_percent_change >= 0 ? '+' : '',
                        pair.usd_price_24hr_percent_change.toFixed(2),
                        "%"),
                    react_1.default.createElement("td", { style: {
                            padding: '1rem',
                            textAlign: 'right',
                            fontFamily: 'monospace'
                        } },
                        "$",
                        pair.liquidity_usd.toLocaleString()))); }))))));
};
exports.MoralisLiquidityPairs = MoralisLiquidityPairs;
