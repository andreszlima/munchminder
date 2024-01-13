"use client";

import { useEffect, useState } from "react";

import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { useSearchParams, usePathname, useRouter } from "next/navigation";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import NewItem from "@/components/custom/items/new-item";
import { CreateItem } from "@/lib/actions/item/create";
import { IndexItems } from "@/lib/actions/item";
import AllItems from "@/components/custom/items/all-items";
import { Input } from "@/components/ui/input";
import { SearchItems } from "@/lib/actions/item/search-items";
import { debounce } from "lodash";

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
  marketId: number;
  imageLink: string;
};

function ItemsPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [page, setPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);

  const fetchItems = async (page: number) => {
    const { orderedItems, totalPages } = await IndexItems(page, 8);
    setItems(orderedItems);
    setTotalPages(totalPages);
  };

  const handleCreateItem = async (formData: FormData) => {
    const item: Item = {
      ...formData,
      marketId: Number(formData.marketId),
    };

    await CreateItem(item);
    fetchItems(page);
  };

  useEffect(() => {
    fetchItems(page);
  }, [page]);

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
        <AllItems items={items} currentPage={page} totalPages={totalPages} fetchItems={fetchItems} />
      </div>
    </div>
  );
}

export default ItemsPage;
