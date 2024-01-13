"use client";

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"

type Market = {
  name: string;
  province: string;
};

type NewMarketProps = {
  action: (market: Market) => Promise<void>;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "Market name must be at least 2 characters.",
  }),
})

export default function NewMarket({ action }: NewMarketProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      province: "Ontario",
    },
  })

  const onSubmit = async (data: Market) => {
    await action(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 w-full">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Market name</FormLabel>
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
        <Button className='w-full' type="submit">Add market</Button>
      </form>
    </Form>
  )
}