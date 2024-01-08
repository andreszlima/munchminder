// Create market from prisma/schema.prisma
"use server";

import prisma from "@/prisma/client";

// type of market
type Item = {
  id: number;
  name: string;
  price: number;
  defaultAmount: number;
  tax: number;
  marketId: number;
  imageLink: string;
};

export async function UpdateItem(item: Item) {
  await prisma.item.update({
    where: {
      id: item.id,
    },
    data: {
      name: item.name,
      price: item.price,
      defaultAmount: item.defaultAmount,
      tax: item.tax,
      marketId: item.marketId,
      imageLink: item.imageLink,
    },
  });
}
