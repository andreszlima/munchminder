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
import { DestroyListItem } from "@/lib/actions/list-items/destroy";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";

type ListItem = {
  id: number;
  listId: number;
  itemId: number;
  amount: number;
  newPrice: number | null;
  item: {
    name: string;
    price: number;
  };
};

type AllProps = {
  items: ListItem[];
  fetchListItems: () => void;
};

export default function FullTable({ items, fetchListItems }: AllProps) {
  // Sum all item's prices
  const sum = items?.reduce((a, b) => a + b.item.price*b.amount, 0).toFixed(2);

  // Destroy item
  async function handleDestroy(item: ListItem) {
    await DestroyListItem(item);
    fetchListItems(); // Update the markets after a market is deleted
  }

  return (
    <Table>
      <TableCaption>Total price: ${sum}</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Item</TableHead>
          <TableHead className="text-center">Amount</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Remove item</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.map((item) => (
          <TableRow key={item.id}>
            <TableCell>{item.item.name}</TableCell>
            <TableCell>{item.amount}</TableCell>
            <TableCell>{item.item.price}</TableCell>
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
  );
}
