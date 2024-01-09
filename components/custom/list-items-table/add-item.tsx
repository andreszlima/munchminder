"use client";

import { GetAllItems } from "@/lib/actions/list-items/get-items-to-list";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

type ItemToList = {
  id: number;
  amount: number;
  name: string;
  price: number;
  defaultAmount: number;
  tax: number;
  marketId: number;
  market: {
    name: string;
  };
  imageLink: string;
};

const FormSchema = z.object({
  id: z.number(),
  amount: z.number(),
  name: z.string().optional(),
  price: z.number().optional(),
  defaultAmount: z.number().optional(),
  tax: z.number().optional(),
  marketId: z.number().optional(),
  market: z
    .object({
      name: z.string(),
    })
    .optional(),
  imageLink: z.string().optional(),
});

type InputProps = {
  action: any;
  listId: number;
};

export default function AddItemToList({
  action,
  listId,
}: {
  action: any;
  listId: number;
}) {
  const [items, setItems] = useState<ItemToList[]>([]);

  async function fetchItems() {
    const newItems = await GetAllItems();
    const itemsWithAmount = newItems.map((item) => ({ ...item, amount: 0 }));
    setItems(itemsWithAmount);
  }

  useEffect(() => {
    fetchItems();
  }, []);

  /////////////////////////////////////////////////////////////////////////

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      amount: 1,
      price: 0,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    const newItem = {
      listId: listId,
      itemId: data.id,
      amount: data.amount,
      newPrice: data.price,
    };
    await action(newItem);
  };

  function onError(errors: any) {
    // console.log(errors);
  }

  let selectedItem;

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)}>
        <div className="p-2">
          <FormField
            control={form.control}
            name="id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <Select
                  onValueChange={(value) => {
                    field.onChange(Number(value));
                    selectedItem = items.find(
                      (item) => item.id === Number(value)
                    );
                    if (selectedItem) {
                      form.setValue("amount", selectedItem.defaultAmount);
                      form.setValue("price", selectedItem.price);
                    }
                  }}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a verified email to display" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="overflow-y-auto max-h-[15rem]">
                    {items.map((item) => (
                      <SelectItem key={item.id} value={item.id.toString()}>
                        {item.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  You can manage email addresses in your{" "}
                  <Link href="/examples/forms">email settings</Link>.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="p-2">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="p-2">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  This is your public display name.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button className="p-2 w-full" type="submit">Add item</Button>
      </form>
    </Form>
  );
}
