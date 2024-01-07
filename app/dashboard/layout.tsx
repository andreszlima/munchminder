import React from 'react'
import { ClerkProvider } from '@clerk/nextjs'
import NavDashboard from '@/components/custom/nav-dashboard'

export default function LandingPage(
    { children }: { children: React.ReactNode }
) {
  return (
    <div>
      <NavDashboard />
      {children}
    </div>
  )
}
