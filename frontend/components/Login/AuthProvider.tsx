import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { SiweMessage } from "siwe";
import { useAccount, useNetwork, useSignMessage } from "wagmi";
import useStorage from "../../hooks/useStorage";

const authFech = (path: string, options?: RequestInit) =>
  fetch(`/api/${path}`, options).then((res) => res.json());

const createSiweMessage = async (address: string, chainId: number) => {
  const { nonce } = await authFech("nonce");
  return new SiweMessage({
    domain: window.location.host,
    address,
    statement: "Sign in",
    uri: window.location.origin,
    version: "1",
    chainId,
    nonce,
  }).prepareMessage();
};

const login = async (message: string, signature: string) =>
  authFech("login", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, signature }),
  });

interface UserContextSIWEType {
  address: string | undefined;
  error: string | undefined;
  loading: boolean;
}

type AuthState = "idle" | "loading" | "signedIn" | "errored";
const makeState = (state: AuthState) => ({
  state,
  isLoading: state === "loading",
  isIdle: state === "idle",
  isSignedIn: state === "signedIn",
  isErrored: state === "errored",
});
const getState = ({ address, error, loading }: UserContextSIWEType) => {
  if (!address && !error && !loading) return makeState("idle");
  if (loading) return makeState("loading");
  if (address) return makeState("signedIn");
  if (error) return makeState("errored");
  return makeState("idle");
};

interface AuthValue {
  address?: string;
  error?: string;
  signIn: () => Promise<void>;
  signOut: () => Promise<void>;
  state: AuthState;
  isLoading: boolean;
  isIdle: boolean;
  isSignedIn: boolean;
  isErrored: boolean;
}

const AuthContext = createContext({} as AuthValue);

export const AuthProvider: React.FC = ({ children }) => {
  const [account, disconnect] = useAccount();
  const [network] = useNetwork();
  const [, signMessage] = useSignMessage();
  const [state, setState] = useState<UserContextSIWEType>({
    loading: false,
    error: undefined,
    address: undefined,
  });

  const { getItem, setItem, removeItem } = useStorage();

  const signIn = useCallback(async () => {
    const address = account.data?.address;
    const chainId = network.data.chain?.id;
    if (!address || !chainId) return;

    setState((x) => ({ ...x, error: undefined, loading: true }));

    try {
      // Create message
      const message = await createSiweMessage(address, chainId);

      // Sign message
      const signature = await signMessage({ message });
      if (signature.error) throw signature.error;

      // Verify signature
      const { jwt, refreshToken, ok } = await login(message, signature.data);
      if (!ok) throw new Error("Error on login");

      setItem("jwt", jwt, "session");
      setItem("refreshToken", refreshToken, "session");

      setState((x) => ({ ...x, address, loading: false }));
    } catch (error: any) {
      console.log(error);

      setState((x) => ({ ...x, error, loading: false }));
    }
  }, [account.data?.address, network.data.chain?.id, signMessage]);

  const signOut = useCallback(async () => {
    disconnect();
    removeItem("jwt", "session");
    removeItem("refreshToken", "session");
    setState({
      loading: false,
      error: undefined,
      address: undefined,
    });
    await authFech("logout");
  }, [disconnect]);

  // Fetch user when:
  useEffect(() => {
    const handler = async () => {
      try {
        setState((x) => ({ ...x, error: undefined, loading: true }));
        const me = await authFech("me");
        // console.log("me", me);
        setState((x) => ({ ...x, address: me.address, loading: false }));
        // call HASURA_ME query with jwt token
      } catch (error: any) {
        setState((x) => ({ ...x, error, loading: false }));
      }
    };
    // 1. page loads
    (async () => await handler())();

    // 2. window is focused (in case user logs out of another window)
    window.addEventListener("focus", handler);
    return () => window.removeEventListener("focus", handler);
  }, []);

  return (
    <AuthContext.Provider
      value={useMemo(
        () => ({
          signOut,
          signIn,
          address: state.address,
          error: state.error,
          ...getState(state),
        }),
        [signIn, signOut, state]
      )}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;
