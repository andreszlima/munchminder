import React from 'react'
import NavDashboard from '@/components/custom/nav-dashboard'
import { Toaster } from '@/components/ui/toaster'

export default function LandingPage(
    { children }: { children: React.ReactNode }
) {
  return (
    <div>
      <NavDashboard />
      {children}
      <Toaster />
    </div>
  )
}
