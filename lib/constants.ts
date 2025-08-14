export const SUPPORTED_CHAINS = {
  base: {
    id: 8453,
    name: "Base",
    network: "base",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      default: { http: ["https://mainnet.base.org"] },
      public: { http: ["https://mainnet.base.org"] },
    },
    blockExplorers: {
      default: { name: "BaseScan", url: "https://basescan.org" },
    },
  },
  localhost: {
    id: 31337,
    name: "Localhost",
    network: "localhost",
    nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
    rpcUrls: {
      default: { http: ["http://127.0.0.1:8545"] },
      public: { http: ["http://127.0.0.1:8545"] },
    },
  },
} as const

export const EVENT_CATEGORIES = [
  "Conference",
  "Workshop",
  "Meetup",
  "Concert",
  "Festival",
  "Sports",
  "Exhibition",
  "Other",
] as const

export const EVENT_STATUS_COLORS = {
  upcoming: "bg-blue-500/10 text-blue-500 border-blue-500/20",
  live: "bg-green-500/10 text-green-500 border-green-500/20",
  ended: "bg-gray-500/10 text-gray-500 border-gray-500/20",
} as const
