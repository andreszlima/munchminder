"use client";

import MyLists from "@/components/custom/lists/my-lists";
import NewList from "@/components/custom/lists/new-list";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IndexLists } from "@/lib/actions/list";
import { CreateList } from "@/lib/actions/list/create";
import { useUser } from "@clerk/nextjs";
import { useCallback, useEffect, useState } from "react";

type List = {
  id: number;
  name: string;
  userId: string;
  openList: boolean;
};

type NewList = {
  name: string;
  userId: string;
};

function ListsPage() {
  const { isSignedIn, user, isLoaded } = useUser();

  const handleCreateList = async (list: NewList) => {
    if (user) {
      list.userId = user.id;
    }
    await CreateList(list);
    fetchLists();
  };

  const [lists, setLists] = useState<List[]>([]);

  const fetchLists = useCallback(async () => {
    if (isLoaded && user) {
      const data = await IndexLists(user.id);
      setLists(data);
    }
  }, [isLoaded, user]);

  useEffect(() => {
    if (isLoaded) {
      fetchLists();
    }
  }, [fetchLists, isLoaded]);

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
      <div className="p-8">
        <MyLists lists={lists} getUpdatedLists={fetchLists} />
      </div>
    </div>
  );
}

export default ListsPage;
