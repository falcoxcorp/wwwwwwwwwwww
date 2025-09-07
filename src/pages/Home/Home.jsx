import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaDiscord, FaRocket } from 'react-icons/fa6';
import CardList from '../../components/CardList/CardList';
import { tags } from '../../helper/Helper';
import { Helmet } from 'react-helmet';

const Home = () => {
  const [activeTable, setActiveTable] = useState('all');
  const { t, i18n } = useTranslation();
  const controls = useAnimation();
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true });

  useEffect(() => {
    if (inView) {
      controls.start('visible');
    }
  }, [controls, inView]);

  const handleButtonClick = (table) => {
    setActiveTable(table);
  };

  // Animaciones
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.3
      }
    }
  };

  const slideInRight = {
    hidden: { opacity: 0, x: 50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" }
    }
  };

  return (
    <>
      {/* SEO Optimizado con Helmet */}
      <Helmet>
        <title>FalcoX | Institutional-Grade Crypto Market Making & DeFi Solutions</title>
        <meta name="description" content="FalcoX provides professional crypto market making, liquidity solutions, and token growth strategies for blockchain projects. Trusted by top projects for sustainable growth." />
        <meta name="keywords" content="crypto market making, DeFi liquidity, token growth, blockchain marketing, cryptocurrency exchange solutions" />
        <meta property="og:title" content="FalcoX | Institutional Crypto Market Making & Growth Solutions" />
        <meta property="og:description" content="Professional market making and growth strategies for blockchain projects. Enhance liquidity and attract investors with our institutional-grade solutions." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://falcox.com/" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="FalcoX | Crypto Market Making Experts" />
        <meta name="twitter:description" content="Institutional-grade market making and growth solutions for blockchain projects. Trusted by top teams worldwide." />
        <link rel="canonical" href="https://falcox.com/" />
        <script type="application/ld+json">
          {`
            {
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "FalcoX",
              "url": "https://falcox.com/",
              "logo": "https://falcox.com/logo.png",
              "description": "Professional crypto market making and token growth solutions",
              "sameAs": [
                "https://twitter.com/falcox",
                "https://linkedin.com/company/falcox"
              ]
            }
          `}
        </script>
      </Helmet>

      {/* Hero Section - Versión Mega Grande */}
      <section className='relative overflow-hidden bg-gradient-to-b from-gray-900 to-gray-950 min-h-screen flex items-center'>
        {/* Efecto de partículas profesional */}
        <div className="absolute inset-0 overflow-hidden opacity-30">
          {[...Array(50)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-500"
              style={{
                width: `${Math.random() * 12 + 4}px`,
                height: `${Math.random() * 12 + 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              animate={{
                y: [0, (Math.random() - 0.5) * 150],
                x: [0, (Math.random() - 0.5) * 80],
                opacity: [0.2, 0.8, 0.2],
              }}
              transition={{
                duration: Math.random() * 25 + 15,
                repeat: Infinity,
                repeatType: 'reverse',
                delay: Math.random() * 5,
              }}
            />
          ))}
        </div>

        {/* Gradiente animado profesional */}
        <motion.div 
          className="absolute inset-0 opacity-50"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(124, 58, 237, 0.4) 0%, transparent 40%)',
              'radial-gradient(circle at 80% 70%, rgba(59, 130, 246, 0.4) 0%, transparent 40%)',
              'radial-gradient(circle at 50% 20%, rgba(139, 92, 246, 0.4) 0%, transparent 40%)'
            ]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            repeatType: 'reverse',
            ease: 'linear',
          }}
        />

        <div className='container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 py-24'>
          <div className='flex flex-col lg:flex-row items-center gap-16'>
            <motion.div 
              className='lg:w-1/2'
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              ref={ref}
            >
              <motion.div variants={fadeInUp} className="mb-10">
                <span className="inline-block px-8 py-3 bg-purple-900/50 text-purple-300 rounded-full text-xl font-bold border-2 border-purple-800">
                  INSTITUTIONAL-GRADE SOLUTIONS
                </span>
              </motion.div>
              
              <motion.h1 
                className="text-6xl md:text-7xl lg:text-8xl font-bold mb-10 leading-snug"
                variants={fadeInUp}
              >
                <span className="bg-gradient-to-r from-white via-purple-200 to-purple-400 bg-clip-text text-transparent">
                  CRYPTO MARKET MAKING
                </span>
                <br />
                <span className="relative inline-block mt-6">
                  <span className="bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                    FOR SUSTAINABLE GROWTH
                  </span>
                  <motion.span 
                    className="absolute -bottom-4 left-0 h-2 w-full bg-gradient-to-r from-purple-500 to-blue-500"
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.8, duration: 1.5, ease: "easeOut" }}
                  />
                </span>
              </motion.h1>
              
              <motion.p 
                className="text-3xl text-gray-300 mb-12 max-w-2xl leading-relaxed"
                variants={fadeInUp}
                transition={{ delay: 0.3 }}
              >
                FalcoX provides institutional-grade market making and token growth solutions 
                for blockchain projects. Our proprietary technology and expert team ensure 
                optimal liquidity, price stability, and sustainable growth for your token.
              </motion.p>
              
              <motion.div 
                className="flex flex-col sm:flex-row gap-6 mb-16"
                variants={fadeInUp}
                transition={{ delay: 0.5 }}
              >
                <Link
                  to="/contact"
                  className="px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-center"
                >
                  GET A FREE CONSULTATION
                </Link>
                <Link
                  to="/case-studies"
                  className="px-12 py-6 bg-transparent border-3 border-purple-500 text-purple-300 hover:bg-purple-900/30 rounded-xl font-bold text-xl transition-all duration-300 text-center"
                >
                  VIEW CASE STUDIES
                </Link>
              </motion.div>
              
              {/* Elementos de confianza */}
              <motion.div 
                className="flex items-center gap-10 flex-wrap"
                variants={fadeInUp}
                transition={{ delay: 0.7 }}
              >
                <div className="flex items-center gap-4">
                  <div className="flex -space-x-4">
                    {[1, 2, 3, 4].map((item) => (
                      <img 
                        key={item}
                        src={`/images/team-${item}.jpg`} 
                        className="w-14 h-14 rounded-full border-2 border-gray-800" 
                        alt={`Team member ${item}`}
                      />
                    ))}
                  </div>
                  <span className="text-gray-400 text-lg">30+ Experts</span>
                </div>
                <div className="h-10 w-0.5 bg-gray-700"></div>
                <div className="flex items-center gap-4">
                  <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <span className="text-gray-400 text-lg">4.9/5 (150+ Reviews)</span>
                </div>
                <div className="h-10 w-0.5 bg-gray-700"></div>
                <div className="flex items-center gap-4">
                  <svg className="w-8 h-8 text-green-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-400 text-lg">250+ Projects Supported</span>
                </div>
              </motion.div>
            </motion.div>
            
            <motion.div 
              className='lg:w-1/2 mt-16 lg:mt-0 flex flex-col items-center justify-center'
              initial="hidden"
              animate="visible"
              variants={slideInRight}
              transition={{ delay: 0.5 }}
            >
              {/* Logo PinkSale simplificado */}
              <motion.div
                className="relative w-full max-w-lg"
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                <div className="absolute -inset-8 bg-gradient-to-r from-pink-500 to-purple-600 rounded-3xl opacity-30 blur-3xl"></div>
                <div className="relative bg-white/5 p-10 rounded-3xl border-2 border-gray-700 backdrop-blur-md shadow-[0_25px_50px_-12px_rgba(139,92,246,0.25)] flex justify-center">
                  <img 
                    src="https://photos.pinksale.finance/file/pinksale-logo-upload/1753414649657-76336eccd5b7e6575e0d48b7a1bb8fdb.png" 
                    className="w-full h-auto max-w-md"
                    alt="PinkSale Logo"
                    loading="lazy"
                  />
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Sección de Logos de Clientes (Social Proof) */}
      <section className="py-16 bg-gray-900 border-t border-b border-gray-800">
        <div className="container mx-auto px-4">
          <motion.h3 
            className="text-center text-gray-400 mb-10 text-lg font-semibold uppercase tracking-wider"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            TRUSTED BY LEADING BLOCKCHAIN PROJECTS
          </motion.h3>
          <motion.div 
            className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-10 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: {
                  staggerChildren: 0.1
                }
              }
            }}
          >
            {[1, 2, 3, 4, 5, 6].map((item) => (
              <motion.div 
                key={item}
                variants={fadeInUp}
                className="flex justify-center"
                whileHover={{ y: -8, scale: 1.1 }}
              >
                <img 
                  src={`/images/client-${item}.png`} 
                  className="h-12 opacity-80 hover:opacity-100 transition-all duration-300" 
                  alt={`Client logo ${item}`}
                  loading="lazy"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Sección de Beneficios para Inversores */}
      <section className="py-24 bg-gray-950 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-center"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-purple-900/50 text-purple-300 rounded-full text-lg font-bold border-2 border-purple-800 mb-6">
              FOR INVESTORS & PROJECTS
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              WHY TOP PROJECTS CHOOSE <span className="text-purple-400">FALCOX</span>
            </h2>
            <p className="text-2xl text-gray-400 max-w-4xl mx-auto">
              Institutional-grade solutions tailored for sustainable growth and market stability
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
            {[
              {
                icon: (
                  <svg className="w-14 h-14 text-purple-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                  </svg>
                ),
                title: "Algorithmic Market Making",
                description: "Our proprietary algorithms provide consistent liquidity and tight spreads across all market conditions.",
                stats: "99.8% uptime"
              },
              {
                icon: (
                  <svg className="w-14 h-14 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                  </svg>
                ),
                title: "Comprehensive Analytics",
                description: "Real-time dashboards with deep market insights and performance metrics for informed decision making.",
                stats: "50+ metrics tracked"
              },
              {
                icon: (
                  <svg className="w-14 h-14 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
                  </svg>
                ),
                title: "Strategic Growth",
                description: "Holistic token growth strategies combining market making, exchange listings, and investor outreach.",
                stats: "3-5x average volume increase"
              },
              {
                icon: (
                  <svg className="w-14 h-14 text-yellow-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                ),
                title: "Risk Management",
                description: "Advanced safeguards against volatility and market manipulation to protect your token's value.",
                stats: "24/7 monitoring"
              },
              {
                icon: (
                  <svg className="w-14 h-14 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                  </svg>
                ),
                title: "Multi-Exchange Coverage",
                description: "Seamless liquidity provision across all major exchanges with unified management.",
                stats: "15+ exchanges supported"
              },
              {
                icon: (
                  <svg className="w-14 h-14 text-indigo-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                ),
                title: "Regulatory Compliance",
                description: "Fully compliant solutions adhering to global financial regulations and best practices.",
                stats: "10+ jurisdictions"
              }
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-gray-900/50 p-10 rounded-2xl border-2 border-gray-800 hover:border-purple-500/30 transition-all duration-300 group"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                whileHover={{ y: -15, boxShadow: "0 20px 40px -10px rgba(124, 58, 237, 0.2)" }}
              >
                <div className="mb-8">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-800 group-hover:bg-purple-900/30 transition-all duration-300">
                    {feature.icon}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-xl text-gray-400 mb-6">{feature.description}</p>
                <p className="text-lg font-bold text-purple-400">{feature.stats}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección de Resultados/Estadísticas */}
      <section className="py-24 bg-gradient-to-br from-gray-900 to-purple-900/20 relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0 bg-[url('/images/dot-pattern.svg')] bg-[length:60px_60px]"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div variants={fadeInUp}>
              <span className="inline-block px-6 py-2 bg-purple-900/50 text-purple-300 rounded-full text-lg font-bold border-2 border-purple-800 mb-6">
                PROVEN RESULTS
              </span>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
                DATA-DRIVEN <span className="text-purple-400">PERFORMANCE</span>
              </h2>
              <p className="text-2xl text-gray-300 mb-10">
                Our market making strategies deliver measurable results that drive sustainable growth and liquidity for your token.
              </p>
              
              <div className="space-y-8">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl text-gray-300 font-semibold">Liquidity Improvement</span>
                    <span className="text-2xl text-purple-400 font-bold">+300%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div className="bg-purple-600 h-3 rounded-full" style={{ width: '95%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl text-gray-300 font-semibold">Volume Growth</span>
                    <span className="text-2xl text-blue-400 font-bold">+450%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div className="bg-blue-600 h-3 rounded-full" style={{ width: '90%' }}></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span className="text-xl text-gray-300 font-semibold">Spread Reduction</span>
                    <span className="text-2xl text-green-400 font-bold">-85%</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-3">
                    <div className="bg-green-600 h-3 rounded-full" style={{ width: '85%' }}></div>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={slideInRight} className="relative">
              <div className="absolute -inset-6 bg-gradient-to-r from-purple-600 to-blue-600 rounded-3xl opacity-30 blur-2xl"></div>
              <div className="relative bg-gray-800 rounded-2xl overflow-hidden border-2 border-gray-700 shadow-2xl p-8">
                <div className="flex justify-between items-center mb-10">
                  <h3 className="text-2xl font-bold text-white">Performance Metrics</h3>
                  <span className="px-4 py-2 bg-green-900/50 text-green-400 rounded-full text-sm font-bold">LIVE DATA</span>
                </div>
                
                <div className="grid grid-cols-2 gap-8 mb-10">
                  <div className="bg-gray-900/50 p-6 rounded-xl border-2 border-gray-700">
                    <div className="text-gray-400 text-lg mb-2">24h Volume</div>
                    <div className="text-3xl font-bold text-white">$42.8M</div>
                    <div className="text-green-400 text-sm flex items-center mt-2">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      +12.4%
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-6 rounded-xl border-2 border-gray-700">
                    <div className="text-gray-400 text-lg mb-2">Avg. Spread</div>
                    <div className="text-3xl font-bold text-white">0.12%</div>
                    <div className="text-green-400 text-sm flex items-center mt-2">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      -3.2%
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-6 rounded-xl border-2 border-gray-700">
                    <div className="text-gray-400 text-lg mb-2">Order Depth</div>
                    <div className="text-3xl font-bold text-white">$5.2M</div>
                    <div className="text-green-400 text-sm flex items-center mt-2">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      +8.7%
                    </div>
                  </div>
                  
                  <div className="bg-gray-900/50 p-6 rounded-xl border-2 border-gray-700">
                    <div className="text-gray-400 text-lg mb-2">Price Stability</div>
                    <div className="text-3xl font-bold text-white">98.4%</div>
                    <div className="text-green-400 text-sm flex items-center mt-2">
                      <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                      </svg>
                      +1.5%
                    </div>
                  </div>
                </div>
                
                <div className="bg-gray-900 rounded-xl p-6 border-2 border-gray-700">
                  <div className="flex items-start">
                    <div className="flex-shrink-0 mt-2">
                      <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-bold text-yellow-300">Real-time Monitoring</h4>
                      <p className="text-lg text-gray-400 mt-2">All metrics are updated in real-time from our market making operations across 15+ exchanges.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Sección de Testimonios */}
      <section className="py-24 bg-gray-900 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <motion.div 
            className="text-center mb-20"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <span className="inline-block px-6 py-2 bg-purple-900/50 text-purple-300 rounded-full text-lg font-bold border-2 border-purple-800 mb-6">
              CLIENT SUCCESS STORIES
            </span>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              WHAT OUR <span className="text-purple-400">CLIENTS SAY</span>
            </h2>
            <p className="text-2xl text-gray-400 max-w-4xl mx-auto">
              Hear from projects that have transformed their market performance with FalcoX
            </p>
          </motion.div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              {
                quote: "FalcoX's market making solution increased our daily volume by 5x within the first month. Their team is incredibly professional and responsive.",
                name: "Sarah Johnson",
                title: "CEO, Blockchain Startup",
                avatar: "/images/avatar-1.jpg"
              },
              {
                quote: "The liquidity and price stability improvements were immediate and significant. We've been able to attract institutional investors thanks to FalcoX.",
                name: "Michael Chen",
                title: "CTO, DeFi Protocol",
                avatar: "/images/avatar-2.jpg"
              },
              {
                quote: "As a project with limited crypto experience, FalcoX guided us through every step. Their analytics dashboard gives us complete transparency.",
                name: "David Rodriguez",
                title: "Founder, NFT Platform",
                avatar: "/images/avatar-3.jpg"
              }
            ].map((testimonial, index) => (
              <motion.div
                key={index}
                className="bg-gray-800/50 p-10 rounded-2xl border-2 border-gray-700 hover:border-purple-500/30 transition-all duration-300"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
                whileHover={{ y: -10 }}
              >
                <div className="mb-8">
                  <svg className="w-10 h-10 text-purple-500 opacity-50" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xl text-gray-300 mb-8 italic">"{testimonial.quote}"</p>
                <div className="flex items-center">
                  <img 
                    src={testimonial.avatar} 
                    className="w-16 h-16 rounded-full border-2 border-purple-500/30 mr-6" 
                    alt={testimonial.name}
                    loading="lazy"
                  />
                  <div>
                    <h4 className="text-xl font-bold text-white">{testimonial.name}</h4>
                    <p className="text-gray-400 text-lg">{testimonial.title}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Sección CTA Final */}
      <section className="py-24 bg-gradient-to-br from-purple-900/40 to-gray-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/grid-pattern.svg')] bg-center"></div>
        </div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div 
            className="max-w-5xl mx-auto text-center"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
              READY TO <span className="text-purple-400">ELEVATE YOUR TOKEN</span> PERFORMANCE?
            </h2>
            <p className="text-2xl text-gray-300 mb-10">
              Schedule a consultation with our market making experts to discuss customized solutions for your project.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Link
                to="/contact"
                className="px-12 py-6 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-xl text-white font-bold text-xl shadow-2xl hover:shadow-3xl transition-all duration-300 text-center"
              >
                GET STARTED TODAY
              </Link>
              <Link
                to="/demo"
                className="px-12 py-6 bg-transparent border-3 border-purple-500 text-purple-300 hover:bg-purple-900/30 rounded-xl font-bold text-xl transition-all duration-300 text-center"
              >
                REQUEST A DEMO
              </Link>
            </div>
            
            <p className="text-gray-400 text-lg mt-12">
              <svg className="w-6 h-6 inline-block mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              BASED IN SINGAPORE • SERVING CLIENTS WORLDWIDE
            </p>
          </motion.div>
        </div>
      </section>

      {/* Main Content Section */}
      <main className="pl-5 pr-5 top-0 overflow-hidden relative bg-gray-950 pt-20 pb-28">
        {/* Efecto de ondas en el fondo */}
        <div className="absolute top-0 left-0 right-0 h-24 overflow-hidden z-0">
          <svg viewBox="0 0 1200 120" preserveAspectRatio="none" className="w-full h-full">
            <path d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z" 
              className="fill-current text-purple-900/20" />
            <path d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
              className="fill-current text-purple-900/10" />
          </svg>
        </div>

        <div className="flex flex-col pb-8 relative z-10">
          {/* Sección de Filtros */}
          <motion.div 
            className="relative flex flex-col gap-6 lg:gap-8 mb-12 lg:mb-16"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <div className="flex flex-col lg:flex-row lg:justify-between">
              <motion.div 
                className="buttonbox relative flex flex-wrap lg:flex-nowrap space-x-3 lg:space-x-6 h-12 border-2 border-gray-700 dark:border-[#55496E] rounded-full shadow-lg mb-6 lg:mb-0 bg-gray-900/50 backdrop-blur-sm"
                whileHover={{ boxShadow: '0 0 25px rgba(139, 92, 246, 0.4)' }}
              >
                <button
                  type="button"
                  className={`flex-1 flex items-center justify-center h-12 px-6 text-center font-bold rounded-full overflow-hidden whitespace-nowrap text-ellipsis text-sm sm:text-base lg:text-lg transition-all duration-300 ${activeTable === 'all' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl' : 'text-gray-300 hover:text-white hover:bg-gray-800/70'}`}
                  onClick={() => handleButtonClick('all')}
                >
                  {t('ALL')}
                </button>

                <button
                  type="button"
                  className={`flex items-center justify-center h-12 px-6 sm:px-8 text-center font-bold rounded-full overflow-hidden whitespace-nowrap text-sm sm:text-base lg:text-lg transition-all duration-300 ${activeTable === 'owner' ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl' : 'text-gray-300 hover:text-white hover:bg-gray-800/70'}`}
                  onClick={() => handleButtonClick('owner')}
                >
                  {t('YOUR CONTRIBUTIONS')}
                </button>

                {tags.map(tag => (
                  <button
                    key={tag}
                    type="button"
                    className={`flex items-center justify-center h-12 px-6 sm:px-8 text-center font-bold rounded-full overflow-hidden whitespace-nowrap text-sm sm:text-base lg:text-lg transition-all duration-300 ${activeTable === `Tag ${tag}` ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-xl' : 'text-gray-300 hover:text-white hover:bg-gray-800/70'}`}
                    onClick={() => handleButtonClick(`Tag ${tag}`)}
                  >
                    {t(tag.toUpperCase())}
                  </button>
                ))}
              </motion.div>

              <motion.div 
                className="createrightbtn mt-6 lg:mt-0"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Link
                  to="/create-token"
                  className="inline-block font-extrabold px-8 py-4 text-white bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 rounded-full text-center shadow-xl hover:shadow-2xl transition-all duration-300 ease-in-out text-base sm:text-lg lg:text-xl"
                >
                  {t('CREATE TOKEN')} <span className="ml-2">→</span>
                </Link>
              </motion.div>
            </div>

            {/* CardList con efectos */}
            <motion.div 
              className="mt-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              <CardList activeTable={activeTable} />
            </motion.div>
          </motion.div>
        </div>
      </main>
    </>
  );
};

export default Home;