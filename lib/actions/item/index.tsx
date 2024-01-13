// Create market from prisma/schema.prisma
"use server";

import prisma from "@/prisma/client";
import lodash from "lodash";

export async function IndexItems(page: number, pageSize: number) {
  const totalItems = await prisma.item.count();
  const totalPages = Math.ceil(totalItems / pageSize);

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
      market: {
        name: "asc",
      },
    },
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const orderedItems = lodash.sortBy(
    items,
    ["market.name", "name"],
    ["asc", "asc"]
  );

  return { orderedItems, totalPages };
}