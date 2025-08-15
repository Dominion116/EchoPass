import { http, createConfig } from "wagmi"
import { base, localhost } from "wagmi/chains"
import { walletConnect, metaMask } from "wagmi/connectors"

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID

const connectors = [
  metaMask({
    dappMetadata: {
      name: "EchoPass",
      url: "https://echopass.app",
    },
  }),
]

// Only add WalletConnect if project ID is available
if (projectId) {
  connectors.unshift(
    walletConnect({
      projectId,
      metadata: {
        name: "EchoPass",
        description: "Tokenized Event Ticketing Platform",
        url: "https://echopass.app",
        icons: ["https://echopass.app/icon.png"],
      },
    }),
  )
}

export const config = createConfig({
  chains: [base, localhost],
  connectors,
  transports: {
    [base.id]: http(),
    [localhost.id]: http(),
  },
})

declare module "wagmi" {
  interface Register {
    config: typeof config
  }
}
