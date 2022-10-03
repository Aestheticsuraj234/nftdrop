import React, { useState, useEffect } from "react";
import type { GetServerSideProps } from "next"
import toast ,{Toaster} from 'react-hot-toast'
import {
  useAddress,
  useDisconnect,
  useMetamask,
  useNFTDrop,
} from "@thirdweb-dev/react";
import { sanityClient, urlFor } from "../../sanity";
import { Collection } from "../../typings";
import Link from "next/link";
import { BigNumber } from "ethers";

interface Props {
  collection: Collection;
}

function NFTDropPage({ collection }: Props) {
  // authentication
  const connectWithMetamask = useMetamask();
  const address = useAddress();
  const disConnect = useDisconnect();
  const [loading, setLoading] = useState(true);
  const [claimedSupply, setClaimSupply] = useState<number>(0);
  const [totalSupply, setTotalSupply] = useState<BigNumber>(0);
  const [priceInEth,setPriceInEth] = useState<string>();
  const nftDrop = useNFTDrop(address); 

  // ....
  const mintNft = ()=>{
    if(!nftDrop || !address) return;


    const quantity = 1;  //how many unique nft you wana claim
    setLoading(true)
    const notification = toast.loading("Minting...",{
      style:{
        background: 'white',
        color: 'green',
        fontWeight:'bolder',
        fontSize:'17px',
        padding:'20px',
      }
    })

    nftDrop.claimTo(address,quantity).then(async(tx)=>{
      const receipt = tx[0].receipt
      const claimedTokenId = tx[0].id
      const claimedNFT = await tx[0].data()
      toast("HOORAY....You SuccessFully Minted",{
        duration:8000,
        style:{
          background: 'green',
          color: 'white',
          fontWeight:'bolder',
          fontSize:'17px',
          padding:'20px',
        }
      })
    }).catch(err=>{
      console.error(err)

      toast("Whoops....Something Went Wrong",{
        style:{
          background: 'red',
          color: 'white',
          fontWeight:'bolder',
          fontSize:'17px',
          padding:'20px',
        }
      })

    }).finally(()=>{
        setLoading(false)
        toast.dismiss(notification);
    })

  }



  useEffect(()=>{
    if (!nftDrop) return
    const fetchPrice = async()=>{
      const claimConditions = await nftDrop.claimedConditions.getAll();
      setPriceInEth(claimConditions?.[0].currencyMetadata.displayValue)

    }
    fetchPrice();

  },[nftDrop])

  useEffect(() => {
    if (!nftDrop) return;

    const fetchNFTDropData = async () => {
      setLoading(true);
      const claimed = await nftDrop.getAllClaimed();
      const total = await nftDrop.totalClaimedSupply();

      setClaimSupply(claimed.length);
      setTotalSupply(total);
      console.log(setClaimSupply);
      setLoading(false);
    };
    fetchNFTDropData();
  }, [nftDrop]);

  // ...

  return (
    <div className="flex  h-screen  flex-col lg:grid lg:grid-cols-10">
      <Toaster position="bottom-center"/>
      {/* Left */}
      <div className="bg-gradient-to-br from-[#5F0A87] to-[#50194f] lg:col-span-4">
        <div className="flex  flex-col  items-center justify-center py-2 lg:min-h-screen">
          <div className="bg-gradient-to-br from-yellow-400 to-purple-600 p-2 rounded-xl">
            <img
              className="w-44 rounded-xl object-cover lg:h-96 lg:w-72 "
              src={urlFor(collection.mainImage).url()}
              alt=""
            />
          </div>

          <div className="text-center p-5 space-y-2">
            <h1 className="text-4xl font-bold text-white">
              {collection.nftCollectionName}
            </h1>
            <h2 className="text-xl text-gray-300">{collection.description}</h2>
          </div>
        </div>
      </div>

      {/* right */}
      <div className="bg-[#1B2430] lg:col-span-6 flex flex-1 flex-col p-12 ">
        {/* Header */}
        <header className="flex items-center justify-between ">
          <Link href={"/"}>
            <h1 className="w-52 cursor-pointer text-center text-white ">
              The{" "}
              <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
                {" "}
                SIGMA{" "}
              </span>{" "}
              NFT
            </h1>
          </Link>
          <button
            onClick={() => (address ? disConnect() : connectWithMetamask())}
            className="rounded-full bg-white text-black px-4 py-2 text-xs font-bold lg:px-5 lg:py-3 lg:text-base"
          >
            {address ? "Disconnect" : "Connect"}
          </button>
        </header>
        <hr className="my-2 border bg-white/70" />
        {address && (
          <p className="font-bold text-center text-transparent  bg-clip-text bg-gradient-to-br from-yellow-300 to-cyan-200">
            You are LoggedIn with Wallet {address.substring(0, 5)}...
            {address.substring(address.length - 5)}
          </p>
        )}

        {/* Content */}
        <div className="mt-10 flex-1 flex flex-col items-center space-y-6  text-center lg:space-y-0 lg:justify-center">
          <img
            className="w-80 object-cover pb-10 lg:h-40"
            src={urlFor(collection.mainImage).url()}
          />

          <h1 className="text-3xl font-bold text-white lg:text-4xl lg:font-extrabold">
            {collection.title}
          </h1>

          {loading ? (
            <div class="flex justify-center items-center">
              <div
                class="spinner-border animate-spin inline-block w-10 h-10 border-4 rounded-full"
                role="status"
              >
                ⏱
              </div>
            </div>
          ) : (
            <p className="pt-2 text-xl text-emerald-500 ">
              {claimedSupply}/{totalSupply?.toString()} NFT's Claimed
            </p>
          )}
        </div>

        {/* mint Button */}
        <button
        onClick={mintNft}
          disabled={
            loading || claimSupply === totalSupply?.toNumber() || !address
          }
          className="h-16 bg-gradient-to-tl from-violet-400 to-blue-400 w-full font-bold text-gray-800 rounded-full disabled:bg-gray-500"
        >
          {loading ? (
            <>loading</>
          ) : claimedSupply === totalSupply?.toNumber() ? (
            <>Sold Out</>
          ) : !address ? (
            <>SignIn to Mint</>
          ) : (
            <span className='font-bold'> Mint NFT ()</span>
          )}
          Mint NFT ({priceInEth} ETH)
        </button>
      </div>
    </div>
  );
}

export default NFTDropPage;

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
  const query = `*[_type == "collection" && slug.current==$id][0]{
    _id,
    title,
    description,
    nftCollectionName,
    mainImage{
    asset
  },
  circleImage{
    asset
  },
  slug{
    current
  },
  creator->{
    _id,
    name,
    address,
    slug{
    current
     },
  },
  }`;

  const collection = await sanityClient.fetch(query, {
    id: params?.id,
  });

  if (!collection) {
    return {
      notFound: true,
    };
  }
  return {
    props: {
      collection,
    },
  };
};
