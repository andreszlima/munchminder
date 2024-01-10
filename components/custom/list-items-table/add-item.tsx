"use client";

import { GetAllItems } from "@/lib/actions/list-items/get-items-to-list";
import React, { useEffect, useState } from "react";

import { Check, CheckIcon, ChevronsUpDown } from "lucide-react";

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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { cn } from "@/lib/utils";
import { CaretSortIcon } from "@radix-ui/react-icons";
import { set } from "lodash";

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
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState(0);

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
              <FormItem className="flex flex-col w-full">
                <FormLabel>Item</FormLabel>
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant="outline"
                        role="combobox"
                        className={cn(
                          "w-full justify-between",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value
                          ? items.find(
                              (item) => item.id === field.value
                            )?.name
                          : "Select item"}
                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-full overflow-auto max-h-[15rem]">
                    <Command>
                      <CommandInput
                        placeholder="Search item..."
                        className="h-9"
                      />
                      <CommandEmpty>No item found.</CommandEmpty>
                      <CommandGroup>
                        {items.map((item) => (
                          <CommandItem
                            value={item.name}
                            key={item.id}
                            onSelect={() => {
                              form.setValue("id", item.id);
                              setOpen(false);
                              form.setValue("amount", item.defaultAmount);
                              form.setValue("price", item.price);
                            }}
                          >
                            {item.name}
                            <CheckIcon
                              className={cn(
                                "ml-auto h-4 w-4",
                                item.id === field.value
                                  ? "opacity-0"
                                  : "opacity-0"
                              )}
                            />
                          </CommandItem>
                        ))}
                      </CommandGroup>
                    </Command>
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Select an item
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
        <Button className="p-2 w-full" type="submit">
          Add item
        </Button>
      </form>
    </Form>
  );
}
