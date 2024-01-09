"use server";

import prisma from "@/prisma/client";

export async function GetAllItems() {
  const items = await prisma.item.findMany({
    select: {
      id: true,
      name: true,
      price: true,
      defaultAmount: true,
      tax: true,
      marketId: true,
      market: {
        select: {
          name: true,
        },
      },
      imageLink: true,
    },
    orderBy: {
      name: "asc",
    },
  });
  return items;
}