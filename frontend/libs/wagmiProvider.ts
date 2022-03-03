import { providers } from "ethers";
import { chain, defaultChains, Connector } from "wagmi";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { WalletLinkConnector } from "wagmi/connectors/walletLink";

// API key for Ethereum node
export const customRPC = process.env.NEXT_PUBLIC_NODE as string;
export const alchemy_api = process.env.NEXT_PUBLIC_ALCHEMY_ID as string;
export const etherscan_api = process.env
  .NEXT_PUBLIC_ETHERSCAN_API_KEY as string;
export const infura_api = process.env.NEXT_PUBLIC_INFURA_ID as string;
const infuraId = infura_api; // walletconnector need that ref

export const StrorageName = process.env.NEXT_PUBLIC_STORAGE_NAME;
// Chains for connectors to support
const chains = defaultChains;
const defaultChain = chain.mainnet;

// Set up connectors
type ConnectorsConfig = { chainId?: number };
export const connectors = ({ chainId }: ConnectorsConfig) => {
  const rpcUrl =
    chains.find((x) => x.id === chainId)?.rpcUrls?.[0] ??
    defaultChain.rpcUrls[0];
  return [
    new InjectedConnector({
      chains,
      options: { shimDisconnect: true },
    }),
    new WalletConnectConnector({
      chains,
      options: {
        infuraId,
        qrcode: true,
      },
    }),
    new WalletLinkConnector({
      chains,
      options: {
        appName: "wagmi",
        jsonRpcUrl: `${rpcUrl}/${infuraId}`,
      },
    }),
  ];
};

// Set up providers
type ProviderConfig = { chainId?: number; connector?: Connector };
export const isChainSupported = (chainId?: number) =>
  chains.some((x) => x.id === chainId);

export const provider = ({ chainId }: ProviderConfig) =>
  new providers.FallbackProvider([
    // new providers.JsonRpcProvider(customRPC, chainId),
    providers.getDefaultProvider(
      isChainSupported(chainId) ? chainId : defaultChain.id,
      {
        alchemy_api,
        etherscan_api,
        infuraId,
      }
    ),
  ]);

export const webSocketProvider = ({ chainId }: ProviderConfig) =>
  isChainSupported(chainId)
    ? new providers.InfuraWebSocketProvider(chainId, infuraId)
    : undefined;
