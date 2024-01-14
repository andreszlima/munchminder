"use client";

import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { GetItem } from "@/lib/actions/item/get-one";
import { Item } from "@/lib/types";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { IndexMarkets } from "@/lib/actions/market";
import { UpdateItem } from "@/lib/actions/item/update";

type Market = {
  id: number;
  name: string;
  province: string;
};

const formSchema = z.object({
  name: z.coerce.string(),
  price: z.coerce.number(),
  defaultAmount: z.coerce.number(),
  tax: z.coerce.number(),
  marketId: z.coerce.number(),
  imageLink: z.coerce.string().optional(),
});

function ItemPage() {
  const params = useParams<{ id: string }>();
  const [item, setItem] = useState<Item>();
  const [markets, setMarkets] = useState<Market[]>([]);

  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      defaultAmount: 1,
      tax: 0,
      marketId: 3,
      imageLink: "",
    },
  });

  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof formSchema>) {
    // Update item
    UpdateItem({
      id: Number(params.id),
      name: values.name,
      price: values.price,
      defaultAmount: values.defaultAmount,
      tax: values.tax,
      marketId: values.marketId,
      imageLink: values.imageLink ? values.imageLink : "",
    });
    fetchItem();
  }

  // 3. Define an error handler.
  function onError(errors: any) {
    // Errors is an Object with form field names
    // and error messages.
  }

  const fetchItem = useCallback(async () => {
    const item = await GetItem(params.id);
    if (item) {
      setItem(item);
      form.setValue("name", item.name);
      form.setValue("price", item.price);
      form.setValue("defaultAmount", item.defaultAmount);
      form.setValue("tax", item.tax);
      form.setValue("marketId", item.marketId);
    }
  }, [form, params.id]);

  // useEffect with async
  useEffect(() => {
    const fetchMarkets = async () => {
      const markets = await IndexMarkets();
      setMarkets(markets);
    };
    fetchItem();
    fetchMarkets();
  }, [fetchItem, form, params.id]);

  return (
    <div className="flex items-center justify-center p-4">
      <Card className="">
        <CardHeader>
          <CardTitle>Update item</CardTitle>
          <CardDescription>Update this item</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit, onError)}
              className="space-y-8"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Item name</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the name of the item
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>This is the current price</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="defaultAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Default amount</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>
                      This is the default amount
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="tax"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax</FormLabel>
                    <FormControl>
                      <Input {...field} />
                    </FormControl>
                    <FormDescription>Tax percentage</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="marketId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Market</FormLabel>
                    <Select
                      key={field.value}
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
                          <SelectItem
                            key={market.id}
                            value={market.id.toString()}
                          >
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
              <Button type="submit">Update item</Button>
            </form>
          </Form>
        </CardContent>
        {/* <CardFooter className="flex justify-between">
          <Button variant="outline">Cancel</Button>
          <Button>Deploy</Button>
        </CardFooter> */}
      </Card>
    </div>
  );
}

export default ItemPage;
