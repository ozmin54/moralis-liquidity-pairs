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
require("./MoralisLiquidityPairs.css");
var MoralisLiquidityPairs = function (_a) {
    var tokenAddress = _a.tokenAddress, apiKey = _a.apiKey, _b = _a.chain, chain = _b === void 0 ? 'eth' : _b;
    var _c = (0, react_1.useState)([]), pairs = _c[0], setPairs = _c[1];
    var _d = (0, react_1.useState)(true), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)(null), error = _e[0], setError = _e[1];
    (0, react_1.useEffect)(function () {
        setLoading(true);
        setError(null);
        fetch("https://deep-index.moralis.io/api/v2.2/erc20/".concat(tokenAddress, "/pairs?chain=").concat(chain), {
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
                throw new Error('Token not found. Please enter a valid token address.');
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
    }, [tokenAddress, apiKey, chain]);
    if (loading) {
        return react_1.default.createElement("div", { style: { textAlign: 'center', padding: '2rem' } }, "Loading liquidity pairs...");
    }
    if (error) {
        return react_1.default.createElement("div", { style: { color: 'red', textAlign: 'center', padding: '1rem' } },
            "Error: ",
            error);
    }
    if (!pairs.length) {
        return react_1.default.createElement("div", { style: { textAlign: 'center', padding: '1rem' } }, "No liquidity pairs found for this token.");
    }
    return (react_1.default.createElement("div", { style: { marginTop: 32 } },
        react_1.default.createElement("h2", { style: { textAlign: 'left', marginBottom: 16 } }, "Liquidity Pairs"),
        react_1.default.createElement("table", { style: { width: '100%', borderCollapse: 'collapse', background: '#fff', borderRadius: 8, overflow: 'hidden' } },
            react_1.default.createElement("thead", null,
                react_1.default.createElement("tr", { style: { background: '#f5f6fa', color: '#222', fontWeight: 600 } },
                    react_1.default.createElement("th", { style: { padding: '12px 16px', textAlign: 'left' } }, "Exchange"),
                    react_1.default.createElement("th", { style: { padding: '12px 16px', textAlign: 'left' } }, "Pair"),
                    react_1.default.createElement("th", { style: { padding: '12px 16px', textAlign: 'left' } }, "Token"),
                    react_1.default.createElement("th", { style: { padding: '12px 16px', textAlign: 'right' } }, "USD Price"),
                    react_1.default.createElement("th", { style: { padding: '12px 16px', textAlign: 'right' } }, "24h Change"),
                    react_1.default.createElement("th", { style: { padding: '12px 16px', textAlign: 'right' } }, "Liquidity (USD)"))),
            react_1.default.createElement("tbody", null, pairs.map(function (pair) { return (react_1.default.createElement("tr", { key: pair.pair_address, style: { borderBottom: '1px solid #eee' } },
                react_1.default.createElement("td", { style: { padding: '12px 16px', display: 'flex', alignItems: 'center', gap: 8 } },
                    pair.exchange_logo && (react_1.default.createElement("img", { src: pair.exchange_logo, alt: pair.exchange_name, style: { width: 24, height: 24, borderRadius: 4, marginRight: 8 } })),
                    pair.exchange_name),
                react_1.default.createElement("td", { style: { padding: '12px 16px' } }, pair.pair_label),
                react_1.default.createElement("td", { style: { padding: '12px 16px' } }, pair.pair.map(function (token) { return (react_1.default.createElement("div", { key: token.token_address, style: { display: 'flex', alignItems: 'center', gap: 6, marginBottom: 4 } },
                    token.token_logo && (react_1.default.createElement("img", { src: token.token_logo, alt: token.token_symbol, style: { width: 20, height: 20, borderRadius: 4 } })),
                    react_1.default.createElement("span", { style: { fontWeight: 500 } }, token.token_symbol),
                    react_1.default.createElement("span", { style: { color: '#888', fontSize: 12, marginLeft: 4 } }, token.token_address))); })),
                react_1.default.createElement("td", { style: { padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace' } },
                    "$",
                    pair.usd_price.toFixed(6)),
                react_1.default.createElement("td", { style: { padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace', color: pair.usd_price_24hr_percent_change >= 0 ? '#48BB78' : '#F56565' } },
                    pair.usd_price_24hr_percent_change >= 0 ? '+' : '',
                    pair.usd_price_24hr_percent_change.toFixed(2),
                    "%"),
                react_1.default.createElement("td", { style: { padding: '12px 16px', textAlign: 'right', fontFamily: 'monospace' } },
                    "$",
                    pair.liquidity_usd.toLocaleString()))); })))));
};
exports.MoralisLiquidityPairs = MoralisLiquidityPairs;
