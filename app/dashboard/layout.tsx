import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'

export default function LandingPage(
    { children }: { children: React.ReactNode }
) {
  return (
    <div>
      {children}
    </div>
  )
}
