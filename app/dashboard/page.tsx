import { UserButton } from '@clerk/nextjs'
import React from 'react'

function DashboardPage() {
  return (
    <div>
      Logged in dashboard
      <UserButton afterSignOutUrl="/"/>
    </div>
  )
}

export default DashboardPage
