"use server";

import prisma from "@/prisma/client";

export async function SearchItems(search: string) {
  const items = await prisma.item.findMany({
    where: {
      name: {
        contains: search,
        mode: "insensitive",
      },
    },
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
  });

  return items;
}
