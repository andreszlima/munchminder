"use client";

import React, { useEffect, useState } from "react";
import { CreateMarket } from "@/lib/actions/market/create";
import { IndexMarkets } from "@/lib/actions/market";
import NewMarket from "@/components/custom/market/new-market";
import AllMarkets from "@/components/custom/market/all-markets";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NewItem from "@/components/custom/items/new-item";
import { CreateItem } from "@/lib/actions/item/create";

// type of item
type Item = {
  id: number;
  name: string;
  price: number;
  defaultAmount: number;
  tax: number;
  marketId: string;
  imageLink?: string;
};

// type of item
type NewItem = {
  name: string;
  price: number;
  defaultAmount: number;
  tax: number;
  marketId: string;
  imageLink?: string;
};

function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);

  const handleCreateItem = async (item: NewItem) => {
    await CreateItem(item);

  };

  return (
    <div>
      <div className="flex justify-center">
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
      <div className="p-8">
        {/* <AllMarkets items={items} fetchMarkets={fetchItems} /> */}
      </div>
    </div>
  );
}

export default ItemsPage;
