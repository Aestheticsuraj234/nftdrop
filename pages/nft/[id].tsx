import React from "react";
import {useAddress, useDisconnect,useMetamask} from '@thirdweb-dev/react';

function NFTDropPage() {

    // authentication
    const connectWithMetamask = useMetamask();
    const address = useAddress();
    const disConnect = useDisconnect();

    // ...

  return (
    <div className="flex  h-screen  flex-col lg:grid lg:grid-cols-10">
      {/* Left */}
      <div className="bg-gradient-to-br from-[#5F0A87] to-[#50194f] lg:col-span-4">
        <div className="flex  flex-col  items-center justify-center py-2 lg:min-h-screen">
          <div className="bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72 "
              src="https://ik.imagekit.io/bayc/assets/ape3.png"
              alt=""
            />
          </div>

          <div className="text-center p-5 space-y-2">
            <h1 className="text-4xl font-bold text-white">SIGMA APES🔮</h1>
            <h2 className="text-xl text-gray-300">
              A collections of a Ape who Lives and breathe on a Real Time
              Blockchain
            </h2>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="bg-[#1B2430] lg:col-span-6 flex flex-1 flex-col p-12 ">
        {/* Header */}
        <header className="flex items-center justify-between ">
          <h1 className="w-52 cursor-pointer text-center text-white ">
            The{" "}
            <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
              {" "}
              SIGMA{" "}
            </span>{" "}NFT
            
          </h1>
          <button onClick={() => (address?disConnect():connectWithMetamask()) } className="rounded-full bg-white text-black px-4 py-2 text-xs font-bold lg:px-5 lg:py-3 lg:text-base">
            {address? 'Disconnect' : 'Connect' }
          </button>
          
        </header>
        <hr className='my-2 border bg-white/70' />
        {address && (
            <p className='font-bold text-center text-transparent  bg-clip-text bg-gradient-to-br from-yellow-300 to-cyan-200'>You are LoggedIn with Wallet {address.substring(0,5)}...{address.substring(address.length -5)}
            </p>
        )}

        {/* Content */}
        <div className='mt-10 flex-1 flex flex-col items-center space-y-6  text-center lg:space-y-0 lg:justify-center'>
            <img className='w-80 object-cover pb-10 lg:h-40' src='https://cdn.sanity.io/images/9ep8u6nk/production/f72570921cab407c11a39c8e1717f5607718e14d-2951x2430.webp'/>

            <h1 className='text-3xl font-bold text-white lg:text-4xl lg:font-extrabold'>
                The Sigma APE Coding Club | NFT Drop
            </h1>

            <p className='pt-2 text-xl text-emerald-500 '>
                13 / 21 NFT's Claimed
            </p>
        </div>

        {/* mint Button */}
        <button className='h-16 bg-gradient-to-tl from-violet-400 to-blue-400 w-full font-bold text-gray-800 rounded-full'>
            Mint NFT (0.01ETH)
        </button>
      </div>
    </div>
  );
}

export default NFTDropPage;