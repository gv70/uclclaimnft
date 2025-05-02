'use client';
import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  className?: string;
  disabled?: boolean;
}

export default function Button({
  children,
  onClick,
  className = '',
  disabled = false,
}: ButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`
        px-4 py-2 rounded-xl font-semibold 
        ${disabled 
          ? 'bg-zinc-700 cursor-not-allowed' 
          : 'bg-primary hover:bg-primary-dark'} 
        text-white transition focus:outline-none focus:ring-2 focus:ring-primary-dark 
        ${className}
      `}
    >
      {children}
    </button>
  );
}
