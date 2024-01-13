import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DestroyMarket } from "@/lib/actions/market/destroy";
import React, { use, useEffect, useState } from "react";
import { IoCloseSharp } from "react-icons/io5";
import { add, debounce } from "lodash";
import { UpdateMarket } from "@/lib/actions/market/update";
import { UpdateItem } from "@/lib/actions/item/update";
import MarketsSelect from "./markets-select-group";
import { IndexMarkets } from "@/lib/actions/market";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { DestroyItem } from "@/lib/actions/item/destroy";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowLeftIcon, ChevronLeftIcon } from "@radix-ui/react-icons";
import Link from "next/link";

type Item = {
  id: number;
  name: string;
  price: number;
  defaultAmount: number;
  tax: number;
  marketId: number;
  imageLink: string;
};

type Market = {
  id: number;
  name: string;
  province: string;
};

type AllItemsProps = {
  items: Item[];
  fetchItems: (page: number) => Promise<void>; // Add this line
  currentPage: number;
  totalPages: number;
};

export default function AllItems({
  items,
  fetchItems,
  currentPage,
  totalPages,
}: AllItemsProps) {
  const [page, setPage] = useState<number>(currentPage);

  async function handleDestroy(item: Item) {
    await DestroyItem(item);
    fetchItems(page); // Update the markets after a market is deleted
  }

  const [itemState, setItemState] = useState(items);
  const [markets, setMarkets] = useState<Market[]>([]);

  // Add this useEffect hook
  useEffect(() => {
    IndexMarkets().then(setMarkets);
    setItemState(items);
  }, [items]);

  const handleInputChange = (id: number, field: string, value: string) => {
    const newItemState = itemState.map((item) => {
      if (item.id === id) {
        // Handle top-level properties
        return { ...item, [field]: value };
      }
      return item;
    });
    setItemState(newItemState);

    const item = newItemState.find((item) => item.id === id);
    if (item) {
      item.imageLink = item.imageLink || "";
      item.price = Number(item.price);
      item.defaultAmount = Number(item.defaultAmount);
      item.tax = Number(item.tax);
      item.marketId = Number(item.marketId);

      debouncedUpdate(
        item.id,
        item.name,
        item.price,
        item.defaultAmount,
        item.tax,
        item.marketId,
        item.imageLink
      );
    }
  };

  const debouncedUpdate = debounce(
    (
      id: number,
      newName: string,
      newPrice: number,
      newDefaultAmount: number,
      newTax: number,
      newMarketId: number,
      newImageLink: string
    ) => {
      UpdateItem({
        id,
        name: newName,
        price: newPrice,
        defaultAmount: newDefaultAmount,
        tax: newTax,
        marketId: Number(newMarketId),
        imageLink: newImageLink,
      });
    },
    2000
  );

  const getMarketName = (marketId: number) => {
    const item = items.find((item) => item.marketId === marketId);
    return item ? item.id : items[0];
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-1"></div>
      <div className="flex flex-auto">
        <Table>
          <TableCaption>List of markets</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="text-center">Item name</TableHead>
              <TableHead className="text-center">Price</TableHead>
              <TableHead className="text-center">Default Amount</TableHead>
              <TableHead className="text-center">Tax</TableHead>
              <TableHead className="text-center">Market</TableHead>
              <TableHead className="text-center">Remove item</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {itemState.map((item) => (
              <TableRow key={item.id}>
                <TableCell>
                  <Input
                    type="text"
                    value={item.name}
                    onChange={(e) =>
                      handleInputChange(item.id, "name", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.price}
                    onChange={(e) =>
                      handleInputChange(item.id, "price", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.defaultAmount}
                    onChange={(e) =>
                      handleInputChange(
                        item.id,
                        "defaultAmount",
                        e.target.value
                      )
                    }
                  />
                </TableCell>
                <TableCell>
                  <Input
                    type="number"
                    value={item.tax}
                    onChange={(e) =>
                      handleInputChange(item.id, "tax", e.target.value)
                    }
                  />
                </TableCell>
                <TableCell>
                  <Select
                    onValueChange={(value) => {
                      handleInputChange(item.id, "marketId", value);
                    }}
                    defaultValue={item.marketId.toString()}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Theme" />
                    </SelectTrigger>
                    <SelectContent>
                      <MarketsSelect markets={markets} />
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell className="flex justify-center">
                  <IoCloseSharp
                    className="text-white hover:text-red-600 items-center hover:cursor-pointer text-2xl text-center"
                    onClick={() => handleDestroy(item)}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-1"></div>
      <div>
        
      </div>
    </div>
  );
}
