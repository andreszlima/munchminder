"use client";

import AddItem from "@/components/custom/list-items-table/add-item";
import FullTable from "@/components/custom/list-items-table/full-table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { AddItemToList } from "@/lib/actions/list-items/add-item";
import { Authorize } from "@/lib/actions/list-items/authorize";
import { ShowListItems } from "@/lib/actions/list-items/show-list";
import { GetListName } from "@/lib/actions/list/get-list-name";
import { UpdateListName } from "@/lib/actions/list/update-name";
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

type ListName = {
  id: number;
  name: string;
};

export default function ListsPage() {
  const params = useParams<{ id: string }>();
  const router = useRouter();
  const { isSignedIn, user, isLoaded } = useUser();
  const [items, setItems] = useState<ListItem[]>();
  const [listName, setListName] = useState<string>();
  const [newListName, setNewListName] = useState<string>();

  const [editorOpen, setEditorOpen] = useState<boolean>(false);

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
  }, [
    isLoaded,
    user,
    params.id,
    getListName,
    fetchListItems,
    router,
    editorOpen,
  ]);

  const handleAddItem = async (formData: AddListItem) => {
    await AddItemToList(formData);
    fetchListItems();
  };

  const handleListNameChange = async (formData: ListName) => {
    await UpdateListName(formData);
    fetchListItems();
  };

  return (
    <>
      <div className="flex justify-center p-6">
        <Card>
          <CardHeader className="items-center">
            <CardTitle className="text-center">
              {!editorOpen && (
                <div className="pb-2 flex items-center cursor-pointer">
                  <div className="px-2">
                    <div>{listName}</div>
                  </div>
                  <div className="px-2">
                    <Badge
                      onClick={() => {
                        setEditorOpen(true);
                      }}
                    >
                      Edit list name
                    </Badge>
                  </div>
                </div>
              )}
              {editorOpen && (
                <div className="pb-2 flex items-center cursor-pointer">
                  <div className="px-2">
                    <Input
                      defaultValue={listName}
                      onChange={(e) => setNewListName(e.target.value)}
                    />
                  </div>
                  <div className="px-2">
                    <Badge
                      onClick={async () => {
                        await handleListNameChange({
                          id: parseInt(params.id),
                          name: newListName ?? "",
                        });
                        setEditorOpen(false);
                      }}
                    >
                      Save
                    </Badge>
                  </div>
                </div>
              )}
              <div className="text-muted-foreground">Add items to list</div>
            </CardTitle>
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
