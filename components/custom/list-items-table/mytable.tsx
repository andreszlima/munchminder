"use client";

import { Select } from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import React, { useEffect, useState } from "react";
import { ComboboxDemo } from "./combobox";
import { Input } from "@/components/ui/input";

export default function MyTable() {
  // Create 2 items here to test
  const initialItems = [
    {
      id: 1,
      name: "Item 1",
      price: 100,
      quantity: 1,
    },
    {
      id: 2,
      name: "Item 2",
      price: 200,
      quantity: 2,
    },
  ];

  const [items, setItems] = useState(initialItems); // initialItems is your initial data

  const handlePriceChange = (id: number, newPrice: number) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, price: newPrice } : item
      )
    );
  };

  const handleNameChange = (id: number, newName: string) => {
    setItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id ? { ...item, name: newName } : item
      )
    );
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent invoices.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Checked</TableHead>
            <TableHead>Item</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Total Price</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {items.map((item) => (
            <TableRow key={item.id}>
              <TableCell>{item.id}</TableCell>
              <TableCell>
                <Input
                  type="text"
                  value={item.name}
                  onChange={(e) => handleNameChange(item.id, e.target.value)}
                />
              </TableCell>
              <TableCell>
                <Input 
                type="number"
                step={1}
                value={item.price}
                onChange={e => handlePriceChange(item.id, parseFloat(e.target.value))}
                 />
              </TableCell>
              <TableCell>
                <ComboboxDemo />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}
