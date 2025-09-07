import React, { useState, useCallback } from 'react';
import { useTranslation } from 'react-i18next';
import { useAccount, useWriteContract } from 'wagmi';
import { daimond, routers, tags } from '../../helper/Helper';
import degenFacetAbi from "../../helper/DegenFacetAbi.json";
import { waitForTransactionReceipt } from 'wagmi/actions';
import { useNavigate } from 'react-router-dom';
import { config } from '../../wagmiClient';
import { motion, AnimatePresence } from 'framer-motion';

// Componentes visuales separados para evitar rerenders
const FloatingShapes = () => {
  const shapes = ['circle', 'triangle', 'square', 'hexagon'];
  const colors = ['from-purple-500', 'from-blue-500', 'from-pink-500', 'from-indigo-500'];
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(15)].map((_, i) => {
        const shape = shapes[Math.floor(Math.random() * shapes.length)];
        const color = colors[Math.floor(Math.random() * colors.length)];
        const size = Math.random() * 30 + 10;
        
        return (
          <motion.div
            key={i}
            className={`absolute bg-gradient-to-br ${color} to-transparent opacity-20`}
            style={{
              width: `${size}px`,
              height: `${size}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              borderRadius: shape === 'circle' ? '50%' : 
                         shape === 'triangle' ? '0' : 
                         shape === 'hexagon' ? '50%' : '10%',
              clipPath: shape === 'triangle' ? 'polygon(50% 0%, 0% 100%, 100% 100%)' : 
                            shape === 'hexagon' ? 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' : 'none'
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 200],
              x: [0, (Math.random() - 0.5) * 100],
              rotate: [0, 360],
              opacity: [0.1, 0.3, 0.1]
            }}
            transition={{
              duration: Math.random() * 20 + 20,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: Math.random() * 5,
              ease: 'easeInOut'
            }}
          />
        );
      })}
    </div>
  );
};

const InteractiveParticles = () => {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {[...Array(50)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-purple-400 opacity-10"
          style={{
            width: `${Math.random() * 8 + 2}px`,
            height: `${Math.random() * 8 + 2}px`,
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
          }}
          animate={{
            y: [0, (Math.random() - 0.5) * 100],
            x: [0, (Math.random() - 0.5) * 50],
            opacity: [0, 0.2, 0],
          }}
          transition={{
            duration: Math.random() * 20 + 15,
            repeat: Infinity,
            repeatType: 'reverse',
            delay: Math.random() * 10,
          }}
        />
      ))}
    </div>
  );
};

const AnimatedWaveBackground = () => {
  return (
    <div className="absolute bottom-0 left-0 right-0 h-32 overflow-hidden transform rotate-180">
      <motion.svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className="w-full h-full"
        animate={{
          opacity: [0.8, 1, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: 'reverse'
        }}
      >
        <path
          d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
          className="fill-current text-purple-800 opacity-40"
        ></path>
        <path
          d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
          className="fill-current text-purple-700 opacity-25"
        ></path>
      </motion.svg>
    </div>
  );
};

const GlowingBorder = ({ children, color = "purple" }) => {
  const colors = {
    purple: "from-purple-500 to-pink-500",
    blue: "from-blue-500 to-cyan-500",
    pink: "from-pink-500 to-red-500",
    indigo: "from-indigo-500 to-blue-500",
    green: "from-green-500 to-emerald-500"
  };

  return (
    <motion.div
      className="relative group"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ scale: 1.005 }}
    >
      <div className={`absolute inset-0 rounded-xl bg-gradient-to-r ${colors[color]} opacity-0 group-hover:opacity-20 blur-md transition-all duration-300`}></div>
      <div className="relative bg-gray-900/50 backdrop-blur-sm rounded-xl border border-gray-700/50 overflow-hidden">
        {children}
      </div>
    </motion.div>
  );
};

const CreateToken = () => {
  const { chain, address } = useAccount();
  const routerAddresses = routers[chain?.id] || [];
  const { writeContractAsync, isPending, isSuccess } = useWriteContract();

  // Estado unificado para evitar múltiples rerenders
  const [formData, setFormData] = useState({
    tokenName: '',
    tickerSymbol: '',
    imageURl: '',
    videoURl: '',
    description: '',
    router: 'Select Router',
    website: '',
    twitter: '',
    telegram: '',
    selectedTag: null,
    initialBuyAmount: 0,
    startTime: '',
    maxPerUser: 0,
    buyAmount: 0,
    sellAmount: 0
  });

  const [showExtraOptions, setShowExtraOptions] = useState(false);
  const [hash, setHash] = useState(null);

  const { t } = useTranslation();
  const navigate = useNavigate();

  // Manejar cambios en los campos de forma optimizada
  const handleInputChange = useCallback((field) => (e) => {
    const value = e.target.value;
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  }, []);

  const handleTagClick = useCallback((tag) => {
    setFormData(prev => ({
      ...prev,
      selectedTag: prev.selectedTag === tag ? null : tag
    }));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!address) {
        alert("Please Connect Wallet");
        return;
      }
      
      const params = {
        name: formData.tokenName,
        symbol: formData.tickerSymbol,
        poolDetails: JSON.stringify({
          name: formData.tokenName,
          symbol: formData.tickerSymbol,
          image: formData.imageURl,
          video: formData.videoURl,
          description: formData.description,
          Website: formData.website,
          Twitter: formData.twitter,
          Telegram: formData.telegram,
          Tag: formData.selectedTag
        }),
        configIndex: 20,
        router: routerAddresses[formData.router],
        startTime: showExtraOptions ? BigInt(Math.floor(new Date(formData.startTime).getTime() / 1000)) : BigInt(Math.floor(new Date().getTime() / 1000)),
        buyFeeRate: showExtraOptions ? formData.buyAmount * 100 : 0,
        sellFeeRate: showExtraOptions ? formData.sellAmount * 100 : 0,
        maxBuyAmount: 0,
        delayBuyTime: 0,
        merkleRoot: "0x0000000000000000000000000000000000000000000000000000000000000000",
        initialBuyAmount: 0
      };

      const data = await writeContractAsync({
        abi: degenFacetAbi,
        address: daimond[1116],
        chainID: parseInt(chain.id, 10),
        functionName: 'createPool',
        value: formData.initialBuyAmount,
        args: [params],
      });
      
      const receipt = await waitForTransactionReceipt(config, {
        hash: data,
      });
      
      console.log(receipt);
      setHash(receipt.transactionHash);
    } catch (error) {
      console.log(error);
      const message = error.shortMessage;
      if (message) {
        if (message.includes('reason:')) {
          const reason = message.split('reason:')[1].trim();
          alert(reason);
        } else {
          alert(message);
        }
      }
    }
  };

  return (
    <main className="relative min-h-[calc(100vh_-_182px)] overflow-hidden bg-gray-900">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-purple-900 to-violet-900"></div>
      <div className="absolute inset-0 bg-[url('https://assets.website-files.com/5e51b3b0337309d672efd94c/5e51b3b03373093d1a2efda0_noise.png')] opacity-10 pointer-events-none"></div>
      <FloatingShapes />
      <InteractiveParticles />
      <AnimatedWaveBackground />
      
      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8">
        <AnimatePresence>
          {hash ? (
            <motion.div
              className="successbox hash-section text-center mt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <motion.h3 
                className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-blue-500"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Token Created Successfully!
              </motion.h3>
              <motion.p className="mt-4 text-gray-300">
                Transaction Hash:{" "}
                <a
                  href={`https://etherscan.io/tx/${hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:text-blue-300 underline"
                >
                  {hash}
                </a>
              </motion.p>
              <motion.button
                onClick={() => navigate('/')}
                className="mt-6 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                Go to Listing page
              </motion.button>
            </motion.div>
          ) : (
            <motion.form 
              className="max-w-4xl mx-auto"
              onSubmit={handleSubmit}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {/* Basic Token Info Section */}
              <GlowingBorder color="purple">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-300 to-pink-300 mb-6">
                    Basic Token Information
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="tokenName" className="block text-sm font-medium text-gray-300 mb-1">
                          Token Name <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="tokenName"
                          name="tokenName"
                          className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all"
                          value={formData.tokenName}
                          onChange={handleInputChange('tokenName')}
                          placeholder="My Awesome Token"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="tickerSymbol" className="block text-sm font-medium text-gray-300 mb-1">
                          Ticker Symbol <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="text"
                          id="tickerSymbol"
                          name="tickerSymbol"
                          className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all"
                          value={formData.tickerSymbol}
                          onChange={handleInputChange('tickerSymbol')}
                          placeholder="MAT"
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="imgUrl" className="block text-sm font-medium text-gray-300 mb-1">
                          Image URL <span className="text-red-400">*</span>
                        </label>
                        <input
                          type="url"
                          id="imgUrl"
                          name="imgUrl"
                          className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all"
                          value={formData.imageURl}
                          onChange={handleInputChange('imageURl')}
                          placeholder="https://example.com/token-image.png"
                          required
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300 mb-1">
                          Description <span className="text-red-400">*</span>
                        </label>
                        <textarea
                          id="description"
                          name="description"
                          className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all min-h-[120px]"
                          value={formData.description}
                          onChange={handleInputChange('description')}
                          placeholder="Describe your token project..."
                          required
                        />
                      </div>
                      <div>
                        <label htmlFor="videoUrl" className="block text-sm font-medium text-gray-300 mb-1">
                          Video URL
                        </label>
                        <input
                          type="url"
                          id="videoUrl"
                          name="videoUrl"
                          className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all"
                          value={formData.videoURl}
                          onChange={handleInputChange('videoURl')}
                          placeholder="https://example.com/token-video.mp4"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </GlowingBorder>

              {/* Social & Router Section */}
              <GlowingBorder color="blue" className="mt-6">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-cyan-300 mb-6">
                    Social Links & Router
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-300 mb-1">
                          Website
                        </label>
                        <input
                          type="url"
                          id="website"
                          name="website"
                          className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                          value={formData.website}
                          onChange={handleInputChange('website')}
                          placeholder="https://my-token-project.com"
                        />
                      </div>
                      <div>
                        <label htmlFor="twitter" className="block text-sm font-medium text-gray-300 mb-1">
                          Twitter
                        </label>
                        <input
                          type="url"
                          id="twitter"
                          name="twitter"
                          className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                          value={formData.twitter}
                          onChange={handleInputChange('twitter')}
                          placeholder="https://twitter.com/my_token"
                        />
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="telegram" className="block text-sm font-medium text-gray-300 mb-1">
                          Telegram
                        </label>
                        <input
                          type="url"
                          id="telegram"
                          name="telegram"
                          className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                          value={formData.telegram}
                          onChange={handleInputChange('telegram')}
                          placeholder="https://t.me/my_token_group"
                        />
                      </div>
                      <div>
                        <label htmlFor="router" className="block text-sm font-medium text-gray-300 mb-1">
                          Router <span className="text-red-400">*</span>
                        </label>
                        <select
                          id="router"
                          name="router"
                          className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all"
                          value={formData.router}
                          onChange={handleInputChange('router')}
                          required
                        >
                          <option value="Select Router">Select Router</option>
                          {Object.entries(routerAddresses).map(([name, address]) => (
                            <option key={name} value={name}>
                              {name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </GlowingBorder>

              {/* Tags Section */}
              <GlowingBorder color="pink" className="mt-6">
                <div className="p-6">
                  <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-300 to-red-300 mb-6">
                    Token Category
                  </h2>
                  <div className="text-sm text-gray-400 mb-4">
                    Select the category that best describes your token
                  </div>
                  <motion.div 
                    className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ staggerChildren: 0.1 }}
                  >
                    {tags.map((tag, index) => (
                      <motion.button
                        key={tag}
                        type="button"
                        onClick={() => handleTagClick(tag)}
                        className={`px-4 py-2 rounded-lg border-2 font-medium transition-all duration-300 ${
                          formData.selectedTag === tag 
                            ? 'bg-gradient-to-br from-pink-600 to-red-600 text-white border-transparent' 
                            : 'bg-gray-800/50 text-gray-300 border-gray-700 hover:border-pink-500'
                        }`}
                        whileHover={{ scale: 1.03 }}
                        whileTap={{ scale: 0.97 }}
                        initial={{ y: 10, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ delay: index * 0.1 }}
                      >
                        {tag}
                      </motion.button>
                    ))}
                  </motion.div>
                </div>
              </GlowingBorder>

              {/* Advanced Parameters Section */}
              <motion.div
                className="mt-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Advanced Token Parameters
                  </h2>
                  <button
                    type="button"
                    onClick={() => setShowExtraOptions(!showExtraOptions)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg bg-purple-900/50 hover:bg-purple-800/50 text-purple-100 transition-colors"
                  >
                    {showExtraOptions ? (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 15l7-7 7 7"></path>
                        </svg>
                        Hide Parameters
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path>
                        </svg>
                        Show Advanced Parameters
                      </>
                    )}
                  </button>
                </div>

                {showExtraOptions && (
                  <motion.div
                    className="grid grid-cols-1 lg:grid-cols-2 gap-6"
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: 'auto' }}
                    transition={{ duration: 0.4 }}
                  >
                    {/* Left Column */}
                    <div className="space-y-6">
                      {/* Start Time */}
                      <GlowingBorder color="purple">
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-purple-500/10">
                              <svg className="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </div>
                            <div>
                              <label htmlFor="startTime" className="block text-lg font-semibold text-white">
                                Start Time
                              </label>
                              <p className="text-sm text-purple-300">
                                When your token will be available for trading
                              </p>
                            </div>
                          </div>
                          <input
                            type="datetime-local"
                            id="startTime"
                            name="startTime"
                            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-purple-500 focus:ring-1 focus:ring-purple-500/30 transition-all"
                            value={formData.startTime}
                            onChange={handleInputChange('startTime')}
                          />
                        </div>
                      </GlowingBorder>

                      {/* Buy Tax */}
                      <GlowingBorder color="blue">
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-blue-500/10">
                              <svg className="w-6 h-6 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path>
                              </svg>
                            </div>
                            <div>
                              <label htmlFor="buyAmount" className="block text-lg font-semibold text-white">
                                Buy Tax
                              </label>
                              <p className="text-sm text-blue-300">
                                Fee applied when users buy your token
                              </p>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="number"
                              id="buyAmount"
                              name="buyAmount"
                              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-blue-500 focus:ring-1 focus:ring-blue-500/30 transition-all pr-12"
                              value={formData.buyAmount}
                              onChange={handleInputChange('buyAmount')}
                              placeholder="0"
                              min="0"
                              max="100"
                            />
                            <span className="absolute right-4 top-3 text-gray-400">%</span>
                          </div>
                        </div>
                      </GlowingBorder>
                    </div>

                    {/* Right Column */}
                    <div className="space-y-6">
                      {/* Sell Tax */}
                      <GlowingBorder color="pink">
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-pink-500/10">
                              <svg className="w-6 h-6 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"></path>
                              </svg>
                            </div>
                            <div>
                              <label htmlFor="sellAmount" className="block text-lg font-semibold text-white">
                                Sell Tax
                              </label>
                              <p className="text-sm text-pink-300">
                                Fee applied when users sell your token
                              </p>
                            </div>
                          </div>
                          <div className="relative">
                            <input
                              type="number"
                              id="sellAmount"
                              name="sellAmount"
                              className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-pink-500 focus:ring-1 focus:ring-pink-500/30 transition-all pr-12"
                              value={formData.sellAmount}
                              onChange={handleInputChange('sellAmount')}
                              placeholder="0"
                              min="0"
                              max="100"
                            />
                            <span className="absolute right-4 top-3 text-gray-400">%</span>
                          </div>
                        </div>
                      </GlowingBorder>

                      {/* Max Buy Amount */}
                      <GlowingBorder color="indigo">
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-indigo-500/10">
                              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"></path>
                              </svg>
                            </div>
                            <div>
                              <label htmlFor="maxPerUser" className="block text-lg font-semibold text-white">
                                Max Buy Per User
                              </label>
                              <p className="text-sm text-indigo-300">
                                Limit per transaction ({chain?.nativeCurrency?.symbol})
                              </p>
                            </div>
                          </div>
                          <input
                            type="number"
                            id="maxPerUser"
                            name="maxPerUser"
                            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500/30 transition-all"
                            value={formData.maxPerUser}
                            onChange={handleInputChange('maxPerUser')}
                            placeholder="0"
                            min="0"
                          />
                        </div>
                      </GlowingBorder>
                    </div>

                    {/* Bottom Section (Full Width) */}
                    <div className="lg:col-span-2">
                      {/* Initial Buy Amount */}
                      <GlowingBorder color="green">
                        <div className="p-5">
                          <div className="flex items-center gap-3 mb-3">
                            <div className="p-2 rounded-lg bg-green-500/10">
                              <svg className="w-6 h-6 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                              </svg>
                            </div>
                            <div>
                              <label htmlFor="initialBuyAmount" className="block text-lg font-semibold text-white">
                                Initial Liquidity
                              </label>
                              <p className="text-sm text-green-300">
                                Amount of {chain?.nativeCurrency?.symbol} to provide as initial liquidity
                              </p>
                            </div>
                          </div>
                          <input
                            type="number"
                            id="initialBuyAmount"
                            name="initialBuyAmount"
                            className="w-full px-4 py-3 rounded-lg bg-gray-800/50 border border-gray-700/50 text-white focus:border-green-500 focus:ring-1 focus:ring-green-500/30 transition-all"
                            value={formData.initialBuyAmount}
                            onChange={handleInputChange('initialBuyAmount')}
                            placeholder={`Enter amount in ${chain?.nativeCurrency?.symbol}`}
                            required
                            min="0"
                          />
                        </div>
                      </GlowingBorder>

                      {/* Configuration Summary */}
                      <motion.div
                        className="mt-6 p-5 bg-gray-800/30 rounded-xl border border-gray-700/50"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                      >
                        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                          <svg className="w-5 h-5 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                          </svg>
                          Configuration Summary
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="space-y-1">
                            <div className="text-gray-400">Start Time</div>
                            <div className="font-medium text-white">
                              {formData.startTime ? new Date(formData.startTime).toLocaleString() : 'Immediately'}
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-gray-400">Buy Tax</div>
                            <div className="font-medium text-blue-400">
                              {formData.buyAmount || 0}%
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-gray-400">Sell Tax</div>
                            <div className="font-medium text-pink-400">
                              {formData.sellAmount || 0}%
                            </div>
                          </div>
                          <div className="space-y-1">
                            <div className="text-gray-400">Max Buy</div>
                            <div className="font-medium text-white">
                              {formData.maxPerUser ? `${formData.maxPerUser} ${chain?.nativeCurrency?.symbol}` : 'No limit'}
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </motion.div>
                )}
              </motion.div>

              {/* Submit Button */}
              <motion.div className="mt-10 text-center">
                <motion.button
                  type="submit"
                  className="relative px-8 py-4 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-bold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
                  disabled={isPending}
                  whileHover={{ 
                    scale: 1.02,
                    boxShadow: "0 5px 15px rgba(124, 58, 237, 0.4)"
                  }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {isPending ? (
                      <>
                        <motion.span
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        >
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
                          </svg>
                        </motion.span>
                        Creating Token...
                      </>
                    ) : (
                      <>
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4"></path>
                        </svg>
                        Create Token
                      </>
                    )}
                  </span>
                  <span className="absolute inset-0 bg-gradient-to-r from-purple-700 to-blue-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
                </motion.button>
              </motion.div>
            </motion.form>
          )}
        </AnimatePresence>
      </div>
    </main>
  );
};

export default CreateToken;