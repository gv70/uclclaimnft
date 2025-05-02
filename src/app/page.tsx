'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import {
  ConnectButton,
  MediaRenderer,
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from 'thirdweb/react';
import { client } from './client';
import { defineChain, getContract, toEther } from 'thirdweb';
import { getContractMetadata } from 'thirdweb/extensions/common';
import {
  claimTo,
  getActiveClaimCondition,
  getTotalClaimedSupply,
  nextTokenIdToMint,
} from 'thirdweb/extensions/erc721';

export default function Home() {
  const account = useActiveAccount();
  const chain = defineChain(84532);
  const [quantity, setQuantity] = useState(1);

  const contract = getContract({
    client,
    chain,
    address: '0x51b5B9C090C2706FD63cB7bEaFf84d2cDf428119',
  });

  const { data: metadata, isLoading: loadingMetadata } = useReadContract(
    getContractMetadata,
    { contract }
  );
  const { data: claimedSupply, isLoading: loadingClaimed } = useReadContract(
    getTotalClaimedSupply,
    { contract }
  );
  const { data: totalSupply, isLoading: loadingTotal } = useReadContract(
    nextTokenIdToMint,
    { contract }
  );
  const { data: claimCondition } = useReadContract(
    getActiveClaimCondition,
    { contract }
  );

  const getPrice = (qty: number) => {
    const pricePerToken = parseInt(
      claimCondition?.pricePerToken.toString() || '0'
    );
    return toEther(BigInt(qty * pricePerToken));
  };

  const claimed = Number(claimedSupply?.toString() ?? '0');
  const total = Number(totalSupply?.toString() ?? '1');
  const progress = Math.min(100, (claimed / total) * 100);

  return (
    <main className="min-h-[100vh] flex items-center justify-center p-4">
      <div className="bg-zinc-800 rounded-2xl shadow-card p-8 max-w-sm w-full text-center">
        <Header />

        {/* Connect wallet */}
        <ConnectButton className="my-4" />

        {/* Social Proof */}
        <div className="flex items-center gap-2 mt-4">
          <div className="flex -space-x-2 overflow-hidden">
            {[...Array(4)].map((_, i) => (
              <img
                key={i}
                src={`/placeholder-avatar-${i + 1}.png`}
                alt={`User ${i + 1}`}
                className="h-8 w-8 rounded-full border-2 border-zinc-950"
              />
            ))}
          </div>
          <p className="text-sm text-neutral-400">
            <span className="font-medium text-neutral-100">{claimed}</span> NFTs already claimed
          </p>
        </div>

        {/* Metadata */}
        {loadingMetadata ? (
          <p className="mt-6">Loading metadata…</p>
        ) : (
          <>
            <MediaRenderer
              client={client}
              src={metadata?.image}
              className="rounded-xl mb-6 w-full h-64 object-cover"
            />
            <h2 className="text-2xl font-heading mb-2">{metadata?.name}</h2>
            <p className="text-neutral-300 mb-4">{metadata?.description}</p>
          </>
        )}

        {/* Supply */}
        {loadingClaimed || loadingTotal ? (
          <p className="mt-4">Loading supply…</p>
        ) : (
          <>
            <p className="text-lg font-medium mb-2">
              Total NFT Supply: {claimed}/{total}
            </p>
            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden mb-6">
              <div
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                style={{ width: `${progress}%` }}
              />
            </div>
          </>
        )}

        {/* Quantity Selector */}
        <div className="flex items-center justify-center space-x-4 mb-6">
          <button
            className="bg-zinc-700 text-white px-4 py-2 rounded-xl"
            onClick={() => setQuantity(Math.max(1, quantity - 1))}
          >
            –
          </button>
          <span className="text-xl font-medium">{quantity}</span>
          <button
            className="bg-zinc-700 text-white px-4 py-2 rounded-xl"
            onClick={() => setQuantity(quantity + 1)}
          >
            +
          </button>
        </div>

        {/* Claim Button */}
        <TransactionButton
          className="w-full rounded-xl bg-primary hover:bg-primary-dark text-white px-4 py-2 font-semibold transition"
          transaction={() =>
            claimTo({
              contract,
              to: account?.address || '',
              quantity: BigInt(quantity),
            })
          }
          onTransactionConfirmed={async () => {
            alert('NFT Claimed!');
            setQuantity(1);
          }}
        >
          Claim NFT ({getPrice(quantity)} ETH)
        </TransactionButton>

        {/* How It Works */}
        <HowItWorks />
      </div>
    </main>
  );
}

function Header() {
  return (
    <header className="mb-6">
      <h1
        className="
          text-3xl md:text-5xl font-heading tracking-tight 
          bg-clip-text text-transparent 
          bg-gradient-to-r from-primary-light to-secondary
        "
      >
        UCL NFT Claim App
      </h1>
    </header>
  );
}

function HowItWorks() {
  const steps = [
    'Connect your wallet',
    'Choose quantity',
    'Confirm the transaction',
    'Receive your NFT',
  ];
  return (
    <ul className="space-y-3 text-left mt-8">
      {steps.map((step, i) => (
        <li key={i} className="flex items-start gap-2">
          {/* inline SVG check icon */}
          <svg
            className="mt-1 h-5 w-5 text-secondary"
            xmlns="http://www.w3.org/2000/svg"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path
              fillRule="evenodd"
              d="M16.707 5.293a1 1 0 00-1.414 0L8 12.586 4.707 9.293a1 1 0 00-1.414 1.414l4 4a1 1 0 001.414 0l8-8a1 1 0 000-1.414z"
              clipRule="evenodd"
            />
          </svg>
          <span>{step}</span>
        </li>
      ))}
    </ul>
  );
}
