"use client";

import { useEffect, useState } from "react";

import {
  Card,
  CardContent,
  CardDescription, CardHeader,
  CardTitle
} from "@/components/ui/card";
import NewItem from "@/components/custom/items/new-item";
import { CreateItem } from "@/lib/actions/item/create";
import { IndexItems } from "@/lib/actions/item";
import AllItems from "@/components/custom/items/all-items";

// type of item
type Item = {
  id: number;
  name: string;
  price: number;
  defaultAmount: number;
  tax: number;
  marketId: number;
  imageLink: string;
};

// type of item
type FormData = {
  id: number;
  name: string;
  price: number;
  defaultAmount: number;
  tax: number;
  marketId: string;
  imageLink: string;
};

function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);

  const fetchItems = async () => {
    const data = await IndexItems();
    setItems(data);
  };

  const handleCreateItem = async (formData: FormData) => {
    const item: Item = {
      ...formData,
      marketId: Number(formData.marketId),
    };

    await CreateItem(item);

  };

  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div>
      <div className="flex justify-center p-6">
        <Card>
          <CardHeader>
            <CardTitle>New item</CardTitle>
            <CardDescription>
              Add a new market to have items assigned to
            </CardDescription>
          </CardHeader>
          <CardContent>
            <NewItem action={handleCreateItem} />
          </CardContent>
        </Card>
      </div>
      <div className="p-6">
        <AllItems items={items} fetchItems={fetchItems} />
      </div>
    </div>
  );
}

export default ItemsPage;
