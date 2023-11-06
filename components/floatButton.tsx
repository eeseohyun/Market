import Link from 'next/link';
import React from 'react';

interface FloatButtonProps {
  children: React.ReactNode;
  href: string;
}

export default function FloatButton({ children, href }: FloatButtonProps) {
  return (
    <Link href={href}>
      <button className="fixed hover:bg-orange-500 border-0 border-transparent transition-colors cursor-pointer  bottom-24 right-5 shadow-xl bg-orange-400 rounded-full w-14 h-14 flex items-center justify-center text-white">
        {children}
      </button>
    </Link>
  );
}
