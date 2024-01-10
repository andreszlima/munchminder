"use client";

import AddItem from "@/components/custom/list-items-table/add-item";
import FullTable from "@/components/custom/list-items-table/full-table";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { AddItemToList } from "@/lib/actions/list-items/add-item";
import { Authorize } from "@/lib/actions/list-items/authorize";
import { ShowListItems } from "@/lib/actions/list-items/show-list";
import { useUser } from "@clerk/nextjs";
import { redirect, useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

type ListItem = {
  id: number;
  listId: number;
  itemId: number;
  amount: number;
  newPrice: number;
  selected: boolean;
  item: {
    name: string;
    price: number;
    market: {
      name: string;
    };
  };
};

type AddListItem = {
  itemId: number;
  listId: number;
  amount: number;
  newPrice: number;
  selected: boolean;
};

export default function ListsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { isSignedIn, user, isLoaded } = useUser();
  const [items, setItems] = useState<ListItem[]>();

  useEffect(() => {
    if (isLoaded && user) {
      Authorize({
        listId: parseInt(params.id),
        userId: user.id,
      }).then((authorized) => {
        if (!authorized) {
          router.push("/dashboard/lists");
        } else {
          fetchListItems();
        }
      });
    }
  });

  const fetchListItems = async () => {
    const data = await ShowListItems(parseInt(params.id));
    setItems(data);
  };

  const handleAddItem = async (formData: AddListItem) => {
    await AddItemToList(formData);
    fetchListItems();
  }

  return (
    <>
      <div className="flex justify-center p-6">
        <Card>
          <CardHeader className="items-center">
            <CardTitle>New item</CardTitle>
          </CardHeader>
          <CardContent>
            <AddItem action={handleAddItem} listId={parseInt(params.id)} />
          </CardContent>
        </Card>
      </div>
      <FullTable items={items} fetchListItems={fetchListItems} />
    </>
  );
}
