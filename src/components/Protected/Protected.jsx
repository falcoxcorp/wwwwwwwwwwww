import { Navigate, Outlet } from "react-router-dom";
import { useAccount } from "wagmi";
import { daimond } from "../../helper/Helper";
import { useEffect, useState } from "react";
import { readContract } from "wagmi/actions";
import { config } from "../../wagmiClient";
import MangerAbi from "../../helper/ManagerFaucetAbi.json";

const ProtectedRoute = () => {
  const { address, isConnecting } = useAccount();
  const [masterConfig, setMasterConfig] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        const result = await readContract(config, {
          address: daimond[1116],
          abi: MangerAbi,
          functionName: "getMasterConfig",
          chainId: 1116,
        });
        setMasterConfig(result);
      } catch (error) {
        console.error("Error fetching master config:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, []);

  if (isConnecting || loading) {
    return <p>Loading...</p>;
  }

  if (
    !address ||
    !masterConfig ||
    !masterConfig.admin ||
    address.toLowerCase() !== masterConfig.admin.toLowerCase()
  ) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
