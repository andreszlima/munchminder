"use server";

import prisma from "@/prisma/client";

type Item = {
  name: string;
  price: number;
  defaultAmount: number;
  tax: number;
  marketId: number;
};

export async function CreateItemReturn(item: Item) {
  const createdItem = await prisma.item.create({
    data: {
      name: item.name,
      price: item.price,
      defaultAmount: item.defaultAmount,
      tax: item.tax,
      marketId: item.marketId,
    },
  });

  return createdItem;
}