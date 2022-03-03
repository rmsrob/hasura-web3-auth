import type { AppProps } from "next/app";
import { ApolloProvider } from "@apollo/client";
import { useApollo } from "../libs/apolloClient";
import { Provider } from "wagmi";
import {
  connectors,
  provider,
  StrorageName,
  webSocketProvider,
} from "../libs/wagmiProvider";
import CustomHead from "../components/Head";
import AuthContextProvider from "../components/Login/AuthProvider";
import { getSessionStorage } from "../libs/getSessionStorage";

const App = ({ Component, pageProps }: AppProps) => {
  const apolloClient = useApollo(pageProps);
  getSessionStorage();

  return (
    <ApolloProvider client={apolloClient}>
      <Provider
        autoConnect
        connectorStorageKey={StrorageName}
        connectors={connectors}
        provider={provider}
        webSocketProvider={webSocketProvider}
      >
        <AuthContextProvider>
          <CustomHead />
          <Component {...pageProps} />
        </AuthContextProvider>
      </Provider>
    </ApolloProvider>
  );
};

export default App;
