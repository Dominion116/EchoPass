import { http, createConfig } from "wagmi"
import { base, localhost } from "wagmi/chains"
import { walletConnect, metaMask } from "wagmi/connectors"

const projectId = process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID!

export const config = createConfig({
  chains: [base, localhost],
  connectors: [
    walletConnect({
      projectId,
      metadata: {
        name: "EchoPass",
        description: "Tokenized Event Ticketing Platform",
        url: "https://echopass.app",
        icons: ["https://echopass.app/icon.png"],
      },
    }),
    metaMask({
      dappMetadata: {
        name: "EchoPass",
        url: "https://echopass.app",
      },
    }),
  ],
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
