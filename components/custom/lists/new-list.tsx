"use client";

import { Button } from '@/components/ui/button';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { now } from 'lodash';

type List = {
  name: string;
  userId: string;
};

type NewListProps = {
  action: (list: List) => Promise<void>;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "List name must be at least 2 characters.",
  }),
  userId: z.string(),
})

export default function NewList({ action }: NewListProps) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      // Use now with formatting to get the current date and time and assign to name
      name: new Date().toLocaleDateString("en", { month: 'short', day: 'numeric', year: 'numeric' }),
      userId: "",
    },
  })

  const onSubmit = async (data: List) => {
    await action(data);
    form.reset();
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>List name</FormLabel>
              <FormControl>
                <Input placeholder="List name here" {...field} />
              </FormControl>
              <FormDescription>
                This is the list name
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className='w-full' type="submit">Add list</Button>
      </form>
    </Form>
  )
}