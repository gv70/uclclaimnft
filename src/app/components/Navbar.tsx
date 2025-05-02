'use client';
import Image from 'next/image';
import Link from 'next/link';

export default function Navbar() {
  return (
    <nav className="bg-zinc-900 shadow-md">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link href="/">
          <a className="flex items-center space-x-2">
            <Image src="/next.svg" alt="Logo" width={32} height={32} />
            <span className="text-xl font-heading text-white">UCL NFT Claim</span>
          </a>
        </Link>
      </div>
    </nav>
  );
}
