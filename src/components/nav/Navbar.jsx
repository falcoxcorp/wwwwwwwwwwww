import React from "react";
import { NavLink } from "react-router-dom";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useTranslation } from "react-i18next";
import { useAccount } from "wagmi";
import { motion } from "framer-motion";

const Navbar = () => {
  const { t, i18n } = useTranslation();
  const { address } = useAccount();

  const handleLanguageChange = (lang) => {
    i18n.changeLanguage(lang);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-gray-800 backdrop-blur-lg px-4 overflow-hidden">
      {/* Efecto de fondo animado */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-br from-gray-900/80 to-gray-900/50"
        initial={{ opacity: 0.8 }}
        animate={{
          opacity: [0.8, 0.85, 0.8],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        {/* Partículas de fondo */}
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-amber-400/10"
            style={{
              width: Math.random() * 10 + 5,
              height: Math.random() * 10 + 5,
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, (Math.random() - 0.5) * 20],
              x: [0, (Math.random() - 0.5) * 20],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              repeatType: "reverse",
              ease: "easeInOut",
            }}
          />
        ))}
      </motion.div>

      <div className="flex justify-between items-center h-[56px] lg:h-[80px] xl:h-[80px] relative z-10">
        {/* Left side: Logo y Links */}
        <div className="flex items-center gap-5">
          <NavLink to="/" className="w-12 sm:w-[220px] relative group">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative"
            >
              <img
                src="./logo/logo.png"
                className="logo h-auto max-h-12 sm:max-h-16"
                alt="logo"
              />
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-400 opacity-0 group-hover:opacity-30 rounded-full blur-md transition-opacity duration-500" />
              <motion.div
                className="absolute -inset-2 opacity-0 group-hover:opacity-100"
                initial={{ rotate: 0 }}
                animate={{ rotate: 360 }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-full h-full border-2 border-amber-400/30 rounded-full" />
              </motion.div>
            </motion.div>
          </NavLink>

          <div className="flex space-x-6">
            <NavLink
              to="/"
              className="text-sm font-semibold font-bold relative group"
            >
              <motion.span
                className="text-gold hover:text-amber-300 transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                {t("board")}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-400 to-yellow-400 transition-all duration-300" />
              </motion.span>
            </NavLink>

            <NavLink
              to="/create-token"
              className="text-sm font-semibold font-bold relative group"
            >
              <motion.span
                className="text-gold hover:text-amber-300 transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                {t("createToken")}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-400 to-yellow-400 transition-all duration-300" />
              </motion.span>
            </NavLink>

            <NavLink
              to="/admin-panel"
              className="text-sm font-semibold font-bold relative group"
            >
              <motion.span
                className="text-gold hover:text-amber-300 transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                {t("Admin")}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-400 to-yellow-400 transition-all duration-300" />
              </motion.span>
            </NavLink>

            <NavLink
              to="#"
              className="text-sm font-semibold font-bold relative group"
            >
              <motion.span
                className="text-gold hover:text-amber-300 transition-colors duration-300"
                whileHover={{ y: -2 }}
              >
                {t("KYC")}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 group-hover:w-full bg-gradient-to-r from-amber-400 to-yellow-400 transition-all duration-300" />
              </motion.span>
            </NavLink>
          </div>
        </div>

        {/* Right side: ConnectButton */}
        <div className="connectbuttons flex items-center gap-4">
          <ConnectButton
            label={t("connect Wallet")}
            accountStatus="address"
            chainStatus="name"
          >
            {({ isConnected, isConnecting }) => {
              return (
                <motion.button
                  whileHover={{ y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`
                    text-sm px-4 py-2 rounded-full focus:ring-2 focus:ring-offset-2
                    ${
                      isConnected
                        ? "bg-gradient-to-br from-green-600 to-emerald-500 hover:shadow-lg hover:shadow-emerald-500/20"
                        : "bg-gradient-to-br from-blue-600 to-cyan-500 hover:shadow-lg hover:shadow-cyan-500/20"
                    }
                    text-white relative overflow-hidden transition-all duration-300
                  `}
                >
                  <span className="relative z-10">
                    {isConnecting
                      ? "Connecting..."
                      : isConnected
                      ? t("walletConnected")
                      : t("connectWallet")}
                  </span>
                  <div className="absolute inset-0 bg-white opacity-0 hover:opacity-10 transition-opacity duration-300" />
                </motion.button>
              );
            }}
          </ConnectButton>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
