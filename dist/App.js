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
var react_1 = __importStar(require("react"));
var MoralisLiquidityPairs_1 = require("./MoralisLiquidityPairs");
var MORALIS_API_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJub25jZSI6ImVmYzM1YWI4LWExYjctNDk0Ny1iNWFmLWJhNjg3NjgzYjRlOSIsIm9yZ0lkIjoiNDQ5MTEyIiwidXNlcklkIjoiNDYyMDg2IiwidHlwZSI6IlBST0pFQ1QiLCJ0eXBlSWQiOiJlOTI0ZTVlNS04ZjE0LTRhNjYtYjJiMy1kNDU4OWQ1YjY5ZWIiLCJpYXQiOjE3NDgxODgxMzcsImV4cCI6NDkwMzk0ODEzN30.NibxenaAqX1DBpeGmba0OC4firN40Yv9E7d3_ED2x5o';
var App = function () {
    var _a = (0, react_1.useState)(''), tokenAddress = _a[0], setTokenAddress = _a[1];
    var _b = (0, react_1.useState)(false), showPairs = _b[0], setShowPairs = _b[1];
    var _c = (0, react_1.useState)(null), apiError = _c[0], setApiError = _c[1];
    var handleSubmit = function (e) {
        e.preventDefault();
        setApiError(null);
        setShowPairs(true);
    };
    return (react_1.default.createElement("div", { style: {
            maxWidth: '1200px',
            margin: '0 auto',
            padding: '2rem',
            fontFamily: 'system-ui, -apple-system, sans-serif'
        } },
        react_1.default.createElement("h1", { style: {
                color: '#2D3748',
                marginBottom: '2rem',
                fontSize: '2rem',
                textAlign: 'center'
            } }, "Token Likidite \u00C7iftleri"),
        apiError && (react_1.default.createElement("div", { style: {
                padding: '1rem',
                marginBottom: '1rem',
                background: '#FFF5F5',
                borderRadius: '4px',
                color: '#C53030'
            } }, apiError)),
        react_1.default.createElement("form", { onSubmit: handleSubmit, style: {
                marginBottom: '2rem',
                background: 'white',
                padding: '1.5rem',
                borderRadius: '8px',
                boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            } },
            react_1.default.createElement("div", { style: { marginBottom: '1rem' } },
                react_1.default.createElement("label", { htmlFor: "tokenAddress", style: {
                        display: 'block',
                        marginBottom: '0.5rem',
                        color: '#4A5568',
                        fontWeight: '500'
                    } }, "Token Adresi"),
                react_1.default.createElement("input", { id: "tokenAddress", type: "text", value: tokenAddress, onChange: function (e) { return setTokenAddress(e.target.value); }, placeholder: "Token adresini girin (\u00F6rn: 0x6982508145454ce325ddbe47a25d4ec3d2311933)", className: "token-input", style: {
                        width: '100%',
                        padding: '0.75rem',
                        border: '1px solid #E2E8F0',
                        borderRadius: '4px',
                        fontSize: '1rem'
                    }, required: true })),
            react_1.default.createElement("button", { type: "submit", className: "fetch-button", style: {
                    background: '#4299E1',
                    color: 'white',
                    padding: '0.75rem 1.5rem',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '1rem',
                    cursor: 'pointer',
                    width: '100%'
                } }, "Likidite \u00C7iftlerini Getir")),
        showPairs && !apiError && (react_1.default.createElement(MoralisLiquidityPairs_1.MoralisLiquidityPairs, { tokenAddress: tokenAddress, apiKey: MORALIS_API_KEY }))));
};
exports.default = App;
