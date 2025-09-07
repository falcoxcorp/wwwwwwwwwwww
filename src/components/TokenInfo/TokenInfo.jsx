import React from 'react';
import { priceInDollar, routers } from '../../helper/Helper';
import { motion } from 'framer-motion';

const getRouter = (value, chain = '97') => {
    const router = routers[chain] || [];
    return Object.keys(router).find(key => router[key].toLowerCase() === value?.toLowerCase());
}

const TokenInfo = ({ poolDetails, data }) => {
    return (
        <motion.div 
            className="token-info-container"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="bg-gradient-to-br from-purple-900/30 to-gray-800/50 rounded-xl p-6 border border-gray-700/50 backdrop-blur-sm">
                <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
                    Token Information
                </h3>
                
                <ul className="space-y-3">
                    <InfoItem label="Name" value={poolDetails.name} />
                    <InfoItem label="Symbol" value={poolDetails.symbol} />
                    <InfoItem label="Description" value={poolDetails.description} />
                    <InfoItem label="Tag" value={poolDetails.Tag} />
                    <InfoItem label="Router" value={getRouter(data[0].result.router, 1868)} />
                    
                    <li className="flex items-start">
                        <span className="text-purple-300 font-medium min-w-[100px]">Market Cap:</span>
                        <span className="text-white font-semibold">
                            ${(parseInt(data[0].result.virtualQuoteReserve) * 10000000 * priceInDollar['1868'] / parseInt(data[0].result.virtualBaseReserve)).toString()}
                        </span>
                    </li>
                    
                    <li className="flex items-start">
                        <span className="text-purple-300 font-medium min-w-[100px]">Address:</span>
                        <motion.a
                            href={`https://soneium.blockscout.com/token/${data[0].result?.token}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-400 hover:text-blue-300 transition-colors flex items-center"
                            whileHover={{ x: 2 }}
                        >
                            <span className="font-mono text-sm">
                                {data[0].result?.token ? `${data[0].result.token.slice(0, 6)}...${data[0].result.token.slice(-4)}` : ''}
                            </span>
                            <svg className="w-3 h-3 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                            </svg>
                        </motion.a>
                    </li>
                    
                    <InfoItem 
                        label="Start Time" 
                        value={data[0].result?.startTime ? new Date(Number(data[0].result.startTime) * 1000).toLocaleString() : 'N/A'} 
                    />
                </ul>
            </div>
        </motion.div>
    );
};

const InfoItem = ({ label, value }) => (
    <motion.li 
        className="flex items-start"
        whileHover={{ x: 2 }}
    >
        <span className="text-purple-300 font-medium min-w-[100px]">{label}:</span>
        <span className="text-white text-sm">{value}</span>
    </motion.li>
);

export default TokenInfo;