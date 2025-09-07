import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { readContract } from 'wagmi/actions';
import abi from "../../helper/ManagerFaucetAbi.json";
import { daimond, priceInDollar, routers } from '../../helper/Helper';
import TokenAbi from '../../helper/TokenAbi.json';
import { useAccount, useReadContract, useReadContracts } from 'wagmi';
import logo from "../../assets/logo/logo.png";
import TradeEventList from '../../components/Statistics/TradeEventList';
import { config } from '../../wagmiClient';
import { Line } from 'react-chartjs-2';
import { Chart, LineController, LineElement, PointElement, LinearScale, Title, CategoryScale } from 'chart.js';
import BuySell from '../../components/BuySell/BuySell';
import { useEffect } from 'react';
import Video from '../../components/Video/Video';
import TokenInfo from '../../components/TokenInfo/TokenInfo';
import { motion } from 'framer-motion';

const CardPage = () => {
  const { token } = useParams();

  if (!token) {
    return <div className="flex justify-center items-center h-screen text-white">Card not found</div>;
  }

  const { data, error, isLoading } = useReadContracts({
    contracts: [{
      abi,
      address: daimond[1116],
      functionName: 'getPoolInfo',
      args: [token],
    }, {
      abi,
      address: daimond[1116],
      functionName: 'getPoolConfig',
      args: [20],
    }]
  });

  const { chain, address } = useAccount();
  const [tokenBalance, setTokenBalance] = useState(0);

  const fetchBalaceOf = async () => {
    try {
      const result = await readContract(config, {
        abi: TokenAbi,
        address: token,
        functionName: 'balanceOf',
        chainId: 1116,
        args: [address],
      });
      setTokenBalance(result)
    } catch (error) {
      console.error('Error fetching amountOut:', error);
    }
  };

  useEffect(() => {
    fetchBalaceOf();
  }, [address]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <div className="flex flex-col items-center space-y-4">
          <motion.img 
            src={logo} 
            alt="Loading Logo" 
            className="w-24 h-24"
            animate={{ rotate: 360 }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          />
          <span className="text-lg text-purple-300 font-semibold">Loading...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900">
        <span className="text-lg text-red-400 font-semibold">Error fetching data: {error.message}</span>
      </div>
    );
  }

  if (!data) {
    return <div className="flex justify-center items-center h-screen text-white">Data not available</div>;
  }

  const poolDetailsParsed = data[0].result?.poolDetails ? JSON.parse(data[0].result.poolDetails) : {};
  const baseReserve = Number(data[0].result.virtualBaseReserve) / (10 ** 18);
  const quoteReserve = Number(data[0].result.virtualQuoteReserve) / (10 ** 18);
  const maxSupply = Number(data[0].result.maxListingBaseAmount) / (10 ** 18);

  const prices = [];
  const supplies = [];

  // Generate price points based on bonding curve
  for (let supply = 1; supply <= maxSupply; supply += maxSupply / 1000) {
    const adjustedBaseReserve = baseReserve + supply;
    const price = quoteReserve / adjustedBaseReserve;
    prices.push(price * (10 ** 9));
    supplies.push(supply);
  }

  Chart.register(LineController, LineElement, PointElement, LinearScale, Title, CategoryScale);
  const chartData = {
    labels: supplies,
    datasets: [
      {
        label: 'Price vs. Supply',
        data: prices,
        borderColor: 'rgba(168, 85, 247, 1)',
        backgroundColor: 'rgba(168, 85, 247, 0.2)',
        borderWidth: 2,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        labels: {
          color: '#E9D5FF',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'Bonding Curve',
        color: '#E9D5FF',
        font: {
          size: 16
        }
      },
    },
    scales: {
      x: {
        type: 'linear',
        title: {
          display: true,
          text: `Supply in ${chain?.nativeCurrency?.symbol ?? 'ETH'}`,
          color: '#E9D5FF'
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.1)'
        },
        ticks: {
          color: '#E9D5FF'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Price in Gwei',
          color: '#E9D5FF'
        },
        grid: {
          color: 'rgba(200, 200, 200, 0.1)'
        },
        ticks: {
          color: '#E9D5FF'
        }
      },
    },
  };

  return (
    <div className="min-h-screen bg-gray-900 py-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div 
              className="bg-gradient-to-br from-purple-900/30 to-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex space-x-4 mb-4">
                {poolDetailsParsed.Website && (
                  <motion.a 
                    href={poolDetailsParsed.Website} 
                    target='_blank' 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="text-purple-300 hover:text-purple-100 transition-colors"
                  >
                    <i className="fa fa-globe text-lg"></i>
                  </motion.a>
                )}
                {poolDetailsParsed.Twitter && (
                  <motion.a 
                    href={poolDetailsParsed.Twitter} 
                    target='_blank' 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="text-blue-300 hover:text-blue-100 transition-colors"
                  >
                    <i className="fa fa-twitter text-lg"></i>
                  </motion.a>
                )}
                {poolDetailsParsed.Telegram && (
                  <motion.a 
                    href={poolDetailsParsed.Telegram} 
                    target='_blank' 
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    className="text-blue-400 hover:text-blue-200 transition-colors"
                  >
                    <i className="fa fa-telegram text-lg"></i>
                  </motion.a>
                )}
              </div>

              <TokenInfo poolDetails={poolDetailsParsed} data={data} />
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-purple-900/30 to-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm"
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                Tokenomics
              </h3>
              <img 
                className="w-full h-auto rounded-lg border border-gray-700/50" 
                src="/images/chart.png" 
                alt="Tokenomics chart" 
              />
            </motion.div>
          </div>

          {/* Center Column */}
          <div className="lg:col-span-6 space-y-6">
            <motion.div 
              className="bg-gradient-to-br from-purple-900/30 to-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center space-x-4">
                <motion.img 
                  className="w-16 h-16 rounded-full border-2 border-purple-500/50"
                  src={poolDetailsParsed?.image} 
                  alt="Token logo"
                  whileHover={{ scale: 1.05 }}
                />
                <motion.h1 
                  className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                >
                  {poolDetailsParsed.name}
                </motion.h1>
              </div>
            </motion.div>

            {/* Aquí moví el gráfico a la columna central */}
            <motion.div 
              className="bg-gradient-to-br from-purple-900/30 to-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <Line data={chartData} options={options} />
            </motion.div>

            <motion.div 
              className="bg-gradient-to-br from-purple-900/30 to-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <TradeEventList contractAddress={token} />
            </motion.div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-3 space-y-6">
            <motion.div 
              className="bg-gradient-to-br from-purple-900/30 to-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="w-full bg-gray-700/50 rounded-full h-2.5 mb-4">
                <motion.div 
                  className="bg-gradient-to-r from-purple-500 to-pink-500 h-2.5 rounded-full" 
                  style={{ 
                    width: `${parseInt((data[0].result.virtualQuoteReserve - data[1].result.initialVirtualQuoteReserve) / (data[0].result.maxListingQuoteAmount + data[0].result.listingFee)) ** 100}%`
                  }}
                  initial={{ width: 0 }}
                  animate={{ 
                    width: `${parseInt((data[0].result.virtualQuoteReserve - data[1].result.initialVirtualQuoteReserve) / (data[0].result.maxListingQuoteAmount + data[0].result.listingFee)) ** 100}%`
                  }}
                  transition={{ duration: 1 }}
                />
              </div>
              <p className="text-sm text-gray-300 mb-4">
                When the market cap hits <span className="text-yellow-300 font-medium">${(parseInt(data[1].result.maxListingQuoteAmount) * 10000000 * priceInDollar['1116'] / parseInt(data[1].result.maxListingBaseAmount)).toString()}</span>, all liquidity from the bonding curve will be deposited into Pancake Swap and burned. The progression accelerates as the price rises.
              </p>

              <BuySell data={data[0].result} token={token} tokenBalance={tokenBalance} reserve={data[1].result} />
            </motion.div>

            {/* Aquí moví el video a la columna derecha */}
            {poolDetailsParsed.video?.length > 0 && (
              <motion.div
                className="bg-gradient-to-br from-purple-900/30 to-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Video link={poolDetailsParsed.video} />
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardPage;