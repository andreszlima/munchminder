"use client";

import AddItem from "@/components/custom/list-items-table/add-item";
import FullTable from "@/components/custom/list-items-table/full-table";
import {
  Card,
  CardContent, CardHeader,
  CardTitle
} from "@/components/ui/card";
import { AddItemToList } from "@/lib/actions/list-items/add-item";
import { Authorize } from "@/lib/actions/list-items/authorize";
import { ShowListItems } from "@/lib/actions/list-items/show-list";
import { GetListName } from "@/lib/actions/list/get-list-name";
import { useUser } from "@clerk/nextjs";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

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
  const [listName, setListName] = useState<string>();

  const getListName = useCallback(async (listId: number) => {
    const listName = await GetListName(listId);
    return listName;
  }, []);

  const fetchListItems = useCallback(async () => {
    const data = await ShowListItems(parseInt(params.id));
    setItems(data);
  }, [params.id]);

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
    getListName(parseInt(params.id)).then((listName) => {
      setListName(listName);
    });
  },[isLoaded, user, params.id, getListName, fetchListItems, router]);



  const handleAddItem = async (formData: AddListItem) => {
    await AddItemToList(formData);
    fetchListItems();
  };

  return (
    <>
      <div className="flex justify-center p-6">
        <Card>
          <CardHeader className="items-center">
            <CardTitle>Add items to list: {listName}</CardTitle>
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
