"use client";

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
import { Input } from "@/components/ui/input";
import React, { useEffect, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { IndexMarkets } from "@/lib/actions/market";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import MarketsSelect from "./markets-select-group";

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

type Market = {
  id: number;
  name: string;
  province: string;
};

type NewItemProps = {
  action: (item: Item) => Promise<void>;
};

const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(2, {
    message: "Item name must be at least 2 characters.",
  }),
  price: z
    .string()
    .transform(parseFloat)
    .refine((value) => !isNaN(value), {
      message: "Price must be a number.",
    }),
  defaultAmount: z.number(),
  tax: z
    .number(),
  marketId: z
    .string()
    .transform(parseFloat)
    .refine((value) => !isNaN(value), {
      message: "Price must be a number.",
    }),
  imageLink: z.string().optional(),
});

export default function NewItem({ action }: NewItemProps) {
  const [markets, setMarkets] = useState<Market[]>([]);

  async function fetchMarkets() {
    const markets = await IndexMarkets();
    setMarkets(markets);
  }

  useEffect(() => {
    fetchMarkets();
  }, [markets]);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: 0,
      name: "",
      price: 0,
      defaultAmount: 1,
      tax: 0,
      marketId: markets[0]?.id,
      imageLink: "",
    },
  });

  const onSubmit = async (data: Item) => {
    data.price = Number(data.price);
    data.defaultAmount = Number(data.defaultAmount);
    data.marketId = Number(data.marketId);
    data.tax = Number(data.tax);
    await action(data);
    form.reset();
    // Reset the marketId to the default value
    form.setValue("marketId", data.marketId);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-3">
        <div className="p-3">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Item name</FormLabel>
                <FormControl>
                  <Input placeholder="Name here" {...field} />
                </FormControl>
                <FormDescription>
                  This is the market common name
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
        </div>
        <div className="p-3">
          <FormField
            control={form.control}
            name="price"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>Price of the item/package</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <br />
        </div>
        <div className="p-3">
          <FormField
            control={form.control}
            name="defaultAmount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Default amount</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    {...field}
                    onChange={(e) => field.onChange(Number(e.target.value))}
                  />
                </FormControl>
                <FormDescription>
                  This is the default amount of items/packages
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="p-3">
          <FormField
            control={form.control}
            name="tax"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tax percentage</FormLabel>
                <FormControl>
                  <Input type="number" {...field} />
                </FormControl>
                <FormDescription>This is the tax percentage</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="p-3">
          <FormField
            control={form.control}
            name="marketId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Market</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value ? field.value.toString() : ""}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a market" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {markets.map((market) => (
                      <SelectItem key={market.id} value={market.id.toString()}>
                        {market.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>
                  Select the market this item belongs to
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <div className="p-3 flex items-center justify-center">
          <Button type="submit">Add item</Button>
        </div>
      </form>
    </Form>
  );
}
