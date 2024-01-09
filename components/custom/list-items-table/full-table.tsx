import { Checkbox } from "@/components/ui/checkbox";
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
import { UpdateChecked } from "@/lib/actions/list-items/updateChecked";
import lodash from "lodash";
import React from "react";
import { IoCloseSharp } from "react-icons/io5";
import { boolean } from "zod";

type ListItem = {
  id: number;
  listId: number;
  itemId: number;
  amount: number;
  newPrice: number | null;
  selected: boolean;
  item: {
    name: string;
    price: number;
    market: {
      name: string;
    };
  };
};

type AllProps = {
  items: ListItem[];
  fetchListItems: () => void;
};

type TypeChecked = {
  id: number;
  selected: boolean;
};

export default function FullTable({ items, fetchListItems }: AllProps) {
  // Sum all item's prices
  const sum = items
    ?.reduce((a, b) => a + b.item.price * b.amount, 0)
    .toFixed(2);

  let summed = lodash(items)
    .groupBy("item.market.name")
    .map((objs, key) => ({
      market: key,
      totalprice: lodash(objs).sumBy((o) => o.item.price * o.amount),
      checkedTotal: lodash(objs)
        .filter("selected")
        .sumBy((o) => o.item.price * o.amount),
    }))
    .value();

  // Destroy item
  async function handleDestroy(item: ListItem) {
    await DestroyListItem(item);
    fetchListItems(); // Update the markets after a market is deleted
  }

  async function updateSelected(item: TypeChecked) {
    await UpdateChecked(item);
    fetchListItems(); // Update the markets after a market is deleted
  }

  return (
    <Table>
      <TableCaption>
        <div>
          <div>Total price: ${sum}</div>
          {
            // @ts-ignore
            summed?.map((item) => (
              <div key={item.market}>
                {item.market}: Total: ${item.totalprice.toFixed(2)} Checked: $
                {item.checkedTotal.toFixed(2)}
              </div>
            ))
          }
        </div>
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Market</TableHead>
          <TableHead className="text-center">Added to cart</TableHead>
          <TableHead className="text-center">Item</TableHead>
          <TableHead className="text-center">Amount</TableHead>
          <TableHead className="text-center">Price</TableHead>
          <TableHead className="text-center">Remove item</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {items?.map((item) => (
          <TableRow key={item.id} className="">
            <TableCell>{item.item.market.name}</TableCell>
            <TableCell className="">
              <Checkbox
                defaultChecked={item.selected}
                className="flex"
                id={item.id.toString()}
                onCheckedChange={(a) => {
                  const checked: TypeChecked = {
                    id: item.id,
                    selected: a as boolean,
                  };
                  updateSelected(checked);
                }}
              />
            </TableCell>
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
