import { http, createConfig } from "wagmi"
import { base, localhost } from "wagmi/chains"
import { metaMask } from "wagmi/connectors"

const connectors = [
  metaMask({
    dappMetadata: {
      name: "EchoPass",
      description: "Tokenized Event Ticketing Platform",
      url: "https://echopass.app",
    },
  }),
]

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
