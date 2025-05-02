'use client';

import Image from "next/image";
import { ConnectButton, MediaRenderer, TransactionButton, useActiveAccount, useReadContract } from "thirdweb/react";
import { client } from "./client";
import { defineChain, getContract, toEther } from "thirdweb";
import { sepolia } from "thirdweb/chains";
import { getContractMetadata } from "thirdweb/extensions/common";
import { claimTo, getActiveClaimCondition, getTotalClaimedSupply, nextTokenIdToMint } from "thirdweb/extensions/erc721";
import { useState } from "react";
import Button from "./components/Button";

export default function Home() {
  const account = useActiveAccount();
  const chain = defineChain(84532);
  const [quantity, setQuantity] = useState(1);

  const contract = getContract({
    client,
    chain,
    address: "0x51b5B9C090C2706FD63cB7bEaFf84d2cDf428119",
  });

  const { data: contractMetadata, isLoading: isContractMetadataLoading } = useReadContract(getContractMetadata, { contract });
  const { data: claimedSupply, isLoading: isClaimedSupplyLoading } = useReadContract(getTotalClaimedSupply, { contract });
  const { data: totalNFTSupply, isLoading: isTotalSupplyLoading } = useReadContract(nextTokenIdToMint, { contract });
  const { data: claimCondition } = useReadContract(getActiveClaimCondition, { contract });

  const getPrice = (qty: number) => {
    const total = qty * parseInt(claimCondition?.pricePerToken.toString() || "0");
    return toEther(BigInt(total));
  };

  return (
    <main className="min-h-[100vh] flex items-center justify-center">
      <div className="bg-zinc-800 rounded-2xl shadow-card p-8 max-w-sm w-full text-center">
        <Header />

        <ConnectButton client={client} chain={chain} className="my-4" />

        {isContractMetadataLoading ? (
          <p>Loading...</p>
        ) : (
          <>
            <MediaRenderer
              client={client}
              src={contractMetadata?.image}
              className="rounded-xl mb-6 w-full h-64 object-cover"
            />
            <h2 className="text-2xl font-heading mb-2">{contractMetadata?.name}</h2>
            <p className="text-neutral-300 mb-4">{contractMetadata?.description}</p>
          </>
        )}

        {isClaimedSupplyLoading || isTotalSupplyLoading ? (
          <p>Loading...</p>
        ) : (
          <p className="text-lg font-medium mb-6">
            Total NFT Supply: {claimedSupply?.toString()}/{totalNFTSupply?.toString()}
          </p>
        )}

        <div className="flex items-center justify-center space-x-4 mb-6">
          <Button onClick={() => setQuantity(Math.max(1, quantity - 1))}>-</Button>
          <span className="text-xl font-medium">{quantity}</span>
          <Button onClick={() => setQuantity(quantity + 1)}>+</Button>
        </div>

        <TransactionButton
          className="w-full"
          transaction={() =>
            claimTo({
              contract,
              to: account?.address || "",
              quantity: BigInt(quantity),
            })
          }
          onTransactionConfirmed={async () => {
            alert("NFT Claimed!");
            setQuantity(1);
          }}
        >
          {`Claim NFT (${getPrice(quantity)} ETH)`}
        </TransactionButton>
      </div>
    </main>
  );
}

function Header() {
  return (
    <header>
      <h1 className="text-3xl md:text-5xl font-heading tracking-tighter text-white mb-4">
        UCL NFT Claim App
      </h1>
    </header>
  );
}
