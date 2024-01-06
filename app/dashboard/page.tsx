import MyTable from '@/components/custom/list-items-table/mytable'
import { UserButton } from '@clerk/nextjs'
import React from 'react'


function DashboardPage() {
  return (
    <div>
      Logged in dashboard
      <UserButton afterSignOutUrl="/"/>
      <MyTable />
    </div>
  )
}

export default DashboardPage
