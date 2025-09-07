import React from 'react';
import { useAccount, useReadContract } from 'wagmi';
import abi from "../../helper/ManagerFaucetAbi.json";
import { daimond, priceInDollar } from '../../helper/Helper';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

const Card = ({ id, reserve, activeTable }) => {
  const navigate = useNavigate();
  const { address } = useAccount();

  // if (!id || id == 1 || id == 2 || id == 3 || id == 4 || id == 5 || id == 6) {
  //   return;
  // }

  const { data, error, isLoading } = useReadContract({
    abi,
    address: daimond[1116],
    functionName: 'getPoolAt',
    args: [(id - 1).toString()],
    chainId: 1116
  });

  if (isLoading) {
    return;
  }

  if (error) {
    return;
  }

  if (!data) {
    return;
  }

  const poolDetailsParsed = data.poolDetails ? JSON.parse(data.poolDetails) : {};
  const addressToCompare = address ? address : "0x0000000000000000000000000000000000000000";
  if (activeTable === "owner" && data.owner !== addressToCompare) {
    return;
  }
  if (activeTable.includes("Tag") && poolDetailsParsed.Tag !== activeTable.split(" ")[1].trim()) {
    console.log({ id, 'tagset': activeTable.split(" ")[1].trim(), 'actual tag': poolDetailsParsed.tag })
    return;
  }

  return (
    <motion.div
      key={data.id}
      className="rounded-xl shadow-lg overflow-hidden cursor-pointer bg-gradient-to-br from-gray-800/50 to-gray-900/70 border border-gray-700/50 hover:border-amber-400/30 transition-all duration-300"
      onClick={() => navigate(`/token/1116/${data.token}`)}
      whileHover={{ y: -5, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <div className="cards dark relative">
        {/* Efecto de brillo al hacer hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 to-amber-400/0 group-hover:to-amber-400/10 transition-all duration-500 pointer-events-none" />
        
        <div className="card-body p-4">
          <motion.div 
            className="relative overflow-hidden rounded-lg mb-3"
            whileHover={{ scale: 1.03 }}
          >
            <img
              src={poolDetailsParsed.image || 'https://codingyaar.com/wp-content/uploads/chair-image.jpg'}
              className="w-full h-48 object-cover transition-all duration-500 hover:scale-105"
              alt="Token Logo"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 flex items-end p-3">
              <span className="text-white text-sm font-medium">View Details</span>
            </div>
          </motion.div>

          <div className="text-section space-y-3">
            <h5 className="card-title text-xl font-bold text-white truncate">{poolDetailsParsed.name}</h5>

            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-300">
                <span>Progress</span>
                <span className='hardcap text-amber-400'>Hard Cap</span>
              </div>
              
              <div className="relative pt-1">
                <div className="overflow-hidden h-2 mb-2 text-xs flex rounded bg-gray-700">
                  <div 
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-gradient-to-r from-amber-400 to-yellow-500 transition-all duration-500" 
                    style={{ width: `${parseInt((data.virtualQuoteReserve - reserve.initialVirtualQuoteReserve) / (data.maxListingQuoteAmount + data.listingFee)) ** 100}%` }}
                  ></div>
                </div>
                <span className="text-xs text-amber-400 absolute right-0 -mt-5">
                  {parseInt((data.virtualQuoteReserve - reserve.initialVirtualQuoteReserve) / (data.maxListingQuoteAmount + data.listingFee)) ** 100}%
                </span>
              </div>

              <div className="flex justify-between items-center">
                <span className='price text-white font-medium flex items-center gap-1'>
                  4.913k  
                  <img 
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAAAAABXZoBIAAAA3ElEQVR4AY3SgQbCYBTF8fNmgV4ggEAAI4hAYDAEHwQD+AAG9AABMIAIAhgYAhYwbt3bubol1R+MH2d3DPKlv7HNKdUfsV9Ca08ounesYB3PuFe+4iQaMHGMdgKiIm5ey1RQS8eOJlaC1RELaK2wA7TigaPveFtoo2HL52dcUsy+wviebGgX1BF3uJd+IWeXEec+6wcFG/yz4cdVb/dAHriG1rg10DbEHtZ6MNvDuhD1Omu6WY20WhxlBtbTFkIMeglG1GqzBlYWRzZU6LPRdpCIbNzn5tD9/1N/6QZlMwcqRvoNxQAAAABJRU5ErkJggg==" 
                    className="w-4 h-4" 
                    alt="ETH" 
                  />
                </span>

                <span className='hardcap text-gray-300 flex items-center gap-1'>
                  <img 
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAAAAABXZoBIAAAA3ElEQVR4AY3SgQbCYBTF8fNmgV4ggEAAI4hAYDAEHwQD+AAG9AABMIAIAhgYAhYwbt3bubol1R+MH2d3DPKlv7HNKdUfsV9Ca08ounesYB3PuFe+4iQaMHGMdgKiIm5ey1RQS8eOJlaC1RELaK2wA7TigaPveFtoo2HL52dcUsy+wviebGgX1BF3uJd+IWeXEec+6wcFG/yz4cdVb/dAHriG1rg10DbEHtZ6MNvDuhD1Omu6WY20WhxlBtbTFkIMeglG1GqzBlYWRzZU6LPRdpCIbNzn5tD9/1N/6QZlMwcqRvoNxQAAAABJRU5ErkJggg==" 
                    className="w-4 h-4" 
                    alt="ETH" 
                  /> 
                  10.000k
                </span>
              </div>

              <p className="card-text text-gray-400 text-sm line-clamp-2 h-12">
                {poolDetailsParsed.description}
              </p>
            </div>
          </div>
        </div>
        
        <hr className="border-gray-700/50" />
        
        <div className='mcapdiv px-4 py-3 flex justify-between items-center'>
          <span className="socialicon flex gap-3">
            <motion.i 
              className="fa fa-globe text-gray-400 hover:text-amber-400 transition-colors" 
              whileHover={{ scale: 1.2 }}
            />
            <motion.i 
              className="fa fa-twitter text-gray-400 hover:text-amber-400 transition-colors" 
              whileHover={{ scale: 1.2 }}
            />
          </span>
          <span className="MCap text-xs text-gray-300">
            MCap: ${parseFloat(parseInt(data.virtualQuoteReserve) * 10000000 * priceInDollar['1116'] / parseInt(data.maxListingBaseAmount)).toFixed(12)}
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default Card;