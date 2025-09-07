import React, { useState, useEffect } from 'react';
import { readContracts } from 'wagmi/actions';
import { config } from '../../wagmiClient';
import Card from '../Card/Card';
import abi from "../../helper/ManagerFaucetAbi.json";
import { daimond } from '../../helper/Helper';
import { motion } from 'framer-motion';

const CardList = ({ activeTable }) => {
  const [error, setError] = useState(null);
  const [totalTokens, setTotalTokens] = useState(null);
  const [reserve, setReserve] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPoolCount = async () => {
      try {
        setIsLoading(true);
        const result = await readContracts(config, {
          contracts: [{
            address: daimond[1116],
            abi,
            functionName: 'getPoolCount',
            chainId: 1116
          }, {
            abi,
            address: daimond[1116],
            functionName: 'getPoolConfig',
            args: [20],
            chainId: 1116
          }]
        });
        
        setTotalTokens(result[0].result.toString());
        setReserve(result[1].result);
      } catch (error) {
        console.error("Error fetching pool count:", error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPoolCount();
  }, []);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-64 bg-gradient-to-br from-red-50 to-white rounded-xl p-6 shadow-lg">
        <div className="text-red-500 text-4xl mb-4">⚠️</div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">Error Loading Data</h3>
        <p className="text-gray-600 text-center max-w-md">{error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="mt-4 px-6 py-2 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
        >
          Try Again
        </button>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="cardbox grid grid-cols-1 mb-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-4 gap-8">
        {Array.from({ length: 4 }).map((_, index) => (
          <div key={index} className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-shadow duration-300 animate-pulse">
            <div className="h-48 bg-gradient-to-r from-gray-100 to-gray-200 rounded-xl mb-6"></div>
            <div className="space-y-3">
              <div className="h-6 bg-gray-200 rounded w-3/4"></div>
              <div className="h-4 bg-gray-200 rounded w-full"></div>
              <div className="h-4 bg-gray-200 rounded w-5/6"></div>
              <div className="h-4 bg-gray-200 rounded w-2/3"></div>
              <div className="pt-4">
                <div className="h-10 bg-gradient-to-r from-gray-200 to-gray-300 rounded-lg"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="mb-12">
      <div className="mb-8 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold text-gray-800 mb-2"
        >
          Investment Opportunities
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-lg text-gray-600 max-w-3xl mx-auto"
        >
          Discover our curated selection of high-potential token pools with competitive returns
        </motion.p>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="cardbox grid grid-cols-1 mb-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8"
      >
        {Array.from({ length: totalTokens || 0 }, (_, index) => (
          <Card 
            key={index} 
            id={index + 1} 
            reserve={reserve} 
            activeTable={activeTable}
          />
        ))}
      </motion.div>

      {totalTokens > 0 && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          className="text-center mt-8"
        >
          <button className="px-8 py-3 bg-gradient-to-r from-blue-600 to-indigo-700 text-white rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105 font-medium">
            View All Investment Options
          </button>
        </motion.div>
      )}
    </div>
  );
};

export default CardList;