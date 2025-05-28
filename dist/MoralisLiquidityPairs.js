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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g = Object.create((typeof Iterator === "function" ? Iterator : Object).prototype);
    return g.next = verb(0), g["throw"] = verb(1), g["return"] = verb(2), typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.MoralisLiquidityPairs = void 0;
var react_1 = __importStar(require("react"));
require("./MoralisLiquidityPairs.css");
var MoralisLiquidityPairs = function (_a) {
    var tokenAddress = _a.tokenAddress, apiKey = _a.apiKey, _b = _a.chain // Default to Ethereum if not specified
    , chain = _b === void 0 ? 'eth' : _b // Default to Ethereum if not specified
    ;
    var _c = (0, react_1.useState)([]), pairs = _c[0], setPairs = _c[1];
    var _d = (0, react_1.useState)(true), loading = _d[0], setLoading = _d[1];
    var _e = (0, react_1.useState)(null), error = _e[0], setError = _e[1];
    (0, react_1.useEffect)(function () {
        var fetchPairs = function () { return __awaiter(void 0, void 0, void 0, function () {
            return __generator(this, function (_a) {
                try {
                    setLoading(true);
                    setError(null);
                    fetch("https://deep-index.moralis.io/api/v2.2/erc20/".concat(tokenAddress, "/pairs?chain=").concat(chain), {
                        method: 'GET',
                        headers: {
                            accept: 'application/json',
                            'X-API-Key': apiKey
                        }
                    })
                        .then(function (response) {
                        if (!response.ok) {
                            if (response.status === 404) {
                                throw new Error('Token not found. Please enter a valid token address.');
                            }
                            throw new Error('Failed to fetch liquidity pairs');
                        }
                        return response.json();
                    })
                        .then(function (data) {
                        setPairs(data);
                        setLoading(false);
                    })
                        .catch(function (error) {
                        setError(error.message);
                        setLoading(false);
                    });
                }
                catch (error) {
                    setError('An error occurred while fetching data');
                    setLoading(false);
                }
                return [2 /*return*/];
            });
        }); };
        if (tokenAddress) {
            fetchPairs();
        }
    }, [tokenAddress, apiKey, chain]);
    if (loading) {
        return react_1.default.createElement("div", { className: "loading" }, "Loading...");
    }
    if (error) {
        return react_1.default.createElement("div", { className: "error" }, error);
    }
    if (!pairs.length) {
        return react_1.default.createElement("div", { className: "no-pairs" }, "No liquidity pairs found for this token");
    }
    return (react_1.default.createElement("div", { className: "pairs-container" },
        react_1.default.createElement("h2", null, "Liquidity Pairs"),
        react_1.default.createElement("div", { className: "pairs-grid" }, pairs.map(function (pair) { return (react_1.default.createElement("div", { key: pair.pairAddress, className: "pair-card" },
            react_1.default.createElement("div", { className: "pair-header" },
                react_1.default.createElement("img", { src: pair.token0.logo, alt: pair.token0.symbol, className: "token-logo" }),
                react_1.default.createElement("span", { className: "pair-symbols" },
                    pair.token0.symbol,
                    "/",
                    pair.token1.symbol),
                react_1.default.createElement("img", { src: pair.token1.logo, alt: pair.token1.symbol, className: "token-logo" })),
            react_1.default.createElement("div", { className: "pair-details" },
                react_1.default.createElement("div", { className: "detail-item" },
                    react_1.default.createElement("span", { className: "label" }, "Exchange:"),
                    react_1.default.createElement("span", { className: "value" }, pair.exchange)),
                react_1.default.createElement("div", { className: "detail-item" },
                    react_1.default.createElement("span", { className: "label" }, "Price (USD):"),
                    react_1.default.createElement("span", { className: "value" },
                        "$",
                        parseFloat(pair.priceUsd).toFixed(6))),
                react_1.default.createElement("div", { className: "detail-item" },
                    react_1.default.createElement("span", { className: "label" }, "24h Change:"),
                    react_1.default.createElement("span", { className: "value ".concat(parseFloat(pair.priceChange24h) >= 0 ? 'positive' : 'negative') },
                        parseFloat(pair.priceChange24h).toFixed(2),
                        "%")),
                react_1.default.createElement("div", { className: "detail-item" },
                    react_1.default.createElement("span", { className: "label" }, "Liquidity (USD):"),
                    react_1.default.createElement("span", { className: "value" },
                        "$",
                        parseFloat(pair.liquidity.usd).toLocaleString()))))); }))));
};
exports.MoralisLiquidityPairs = MoralisLiquidityPairs;
