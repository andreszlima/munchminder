// Create market from prisma/schema.prisma
"use server";

import prisma from "@/prisma/client";

// type of item
type Item = {
  name: string;
  price: number;
  defaultAmount: number;
  tax: number;
  marketId: number;
};

export async function CreateItem(item: Item) {
  await prisma.item.create({
    data: {
      name: item.name,
      price: item.price,
      defaultAmount: item.defaultAmount,
      tax: item.tax,
      marketId: item.marketId,
    },
  });
}
