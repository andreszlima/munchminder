"use client";

import NewList from '@/components/custom/lists/new-list'
import UserId from '@/components/custom/user-id';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { CreateList } from '@/lib/actions/list/create';
import { currentUser, useUser } from '@clerk/nextjs';
import React from 'react'

type List = {
  name: string;
  userId: string;
};

function ListsPage() {

  const { isSignedIn, user, isLoaded } = useUser();


  const handleCreateList = async (list: List) => {
    if (user) {
    list.userId = user.id
    }
    await CreateList(list);
  }
  
  return (
    <div>
      <div className="flex justify-center p-8">
        <Card>
          <CardHeader>
            <CardTitle>New list</CardTitle>
            <CardDescription>
              Add a new list to have items assigned to
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NewList action={handleCreateList} />
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default ListsPage
