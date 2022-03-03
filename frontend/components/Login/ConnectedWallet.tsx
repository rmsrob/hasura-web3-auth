import { useAccount } from "wagmi";

const ConnectedWallet = () => {
  const [{ data, loading, error }, disconnect] = useAccount({
    fetchEns: true,
  });

  return (
    <>
      {error && <div>error: {error}</div>}
      {loading && <div>loading...</div>}
      {!error && !loading && data && (
        <div>
          <img src={data?.ens?.avatar as string} alt="ENS Avatar" />
          <div>
            {data.ens?.name
              ? `${data.ens?.name} (${data.address})`
              : data.address}
          </div>
          <div>Connected to {data?.connector?.name}</div>
          <button onClick={disconnect}>Disconnect</button>
        </div>
      )}
    </>
  );
};

export default ConnectedWallet;
