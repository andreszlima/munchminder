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
import { CaretSortIcon, ReloadIcon } from "@radix-ui/react-icons";
import { set } from "lodash";
import { CreateItemReturn } from "@/lib/actions/item/create-return";

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
  amount: z.coerce.number().positive().optional(),
  name: z.string().optional(),
  price: z.coerce.number().positive().optional(),
  defaultAmount: z.number().optional(),
  tax: z.number().optional(),
  marketId: z.number().optional(),
  market: z
    .object({
      name: z.string(),
    })
    .optional(),
  imageLink: z.string().optional(),
  newName: z.string().optional(),
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
  const [hideNewNameField, setHideNewNameField] = useState<boolean>(true);
  const [searchField, setSearchField] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

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
      newName: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    if (hideNewNameField) {
      const newItem = {
        listId: listId,
        itemId: data.id,
        amount: Number(data.amount),
        newPrice: data.price,
      };
      await action(newItem);
      form.reset({ id: 0, amount: 0, price: 0 });
    } else {
      const itemCreated = await CreateItemReturn({
        name: data.newName || "",
        price: data.price || 0,
        defaultAmount: Number(data.amount),
        tax: 0,
        // TODO: Make sure this marketId exists in the database
        marketId: 1,
      });

      const newItem = {
        listId: listId,
        itemId: itemCreated.id,
        amount: Number(data.amount),
        newPrice: data.price,
      };
      await action(newItem);
      fetchItems();

      setHideNewNameField(true);
      form.reset({ id: 0, amount: 0, price: 0 });
    }
    setLoading(false);
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
                          ? items.find((item) => item.id === field.value)?.name
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
                        onValueChange={(value) => {
                          setSearchField(value);
                        }}
                      />
                      <CommandEmpty>
                        <a
                          onClick={() => {
                            setHideNewNameField(false);
                            setOpen(false);
                            form.reset({ id: 0, amount: 1, price: 0 });
                            form.setValue("newName", searchField);
                          }}
                        >
                          <br /> Click here to add a new item
                        </a>
                      </CommandEmpty>
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
                              setHideNewNameField(true);
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
                <FormDescription>Select an item</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        {!hideNewNameField && (
          <div className="p-2">
            <FormField
              control={form.control}
              name="newName"
              render={({ field }) => (
                <FormItem hidden={hideNewNameField}>
                  <FormLabel>New item</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      onChange={(e) => {
                        return field.onChange(e.target.value);
                      }}
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
        )}

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
                    onChange={(e) => {
                      return field.onChange(e.target.value);
                    }}
                    step="any"
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
                    onChange={(e) => field.onChange(e.target.value)}
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
          {loading && <ReloadIcon className="h-4 w-4 mr-2 animate-spin" />}
          Add item
        </Button>
      </form>
    </Form>
  );
}
