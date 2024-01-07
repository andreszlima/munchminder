import { cn } from '@/lib/utils'
import React from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link';

export default function NavLinkDashboard({ reference, text }: { reference: string, text: string}) {
  const pathname = usePathname();

  if (pathname === reference) {
    return (
      <Link href={reference} className="px-2 text-blue-500">{text}</Link>
    )
  } else {
    return (
      <Link href={reference} className="hover:text-blue-500 px-2 text-white">{text}</Link>
    )
  }
}
