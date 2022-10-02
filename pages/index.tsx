import type { NextPage, GetServerSideProps } from "next";
import Head from "next/head";
import Image from "next/image";
import { sanityClient, urlFor } from "../sanity";
import { Collection } from "../typings";
import  Link  from "next/link";

interface Props {
  collections: Collection[];
}

const Home = ({ collections }: Props) => {
  return (
    <div className="  max-w-7xl mx-auto 2xl:px-0 flex flex-col min-h-screen">
      <Head>
        <title>NFT Drop</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="mb-10 mt-3 text-4xl font-extralight ">
        The{" "}
        <span className="font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
          {" "}
          SIGMA{" "}
        </span>{" "}
        NFT
      </h1>

      <main className="bg-slate-600 p-10 shadow-xl shadow-violet-400">
        <div className="grid space-x-3 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
          {collections.map((collection) => (
            <Link href={`/nft/${collection.slug.current}`}>
              <div className="flex  flex-col  items-center cursor-pointer transition-all duration-200 hover:scale-105">
                <img
                  className="h-96  w-60  rounded-2xl object-cover"
                  src={urlFor(collection.mainImage).url()}
                  alt=""
                />

                <div>
                  <h2 className="text-3xl text-white">{collection.title}</h2>
                  <p className="mt-2 text-sm text-gray-300">
                    {collection.description}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
};

export default Home;

export const getServerSideProps: GetServerSideProps = async () => {
  const query = `*[_type == 'collection']{
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

  const collections = await sanityClient.fetch(query);

  console.log(collections);
  return {
    props: {
      collections,
    },
  };
};
