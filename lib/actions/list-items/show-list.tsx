// Create market from prisma/schema.prisma
"use server";

import lodash from "lodash";

import prisma from "@/prisma/client";

export async function ShowListItems(listId: number) {
  const listItems = await prisma.listItem.findMany({
    select: {
      id: true,
      listId: true,
      itemId: true,
      amount: true,
      newPrice: true,
      selected: true,
      item: {
        select: {
          name: true,
          price: true,
          market: {
            select: {
              name: true,
            },
          },
          tax: true,
        },
      },
    },
    where: {
      listId: listId,
    },
  });

  listItems.forEach((listItem) => {
    listItem.newPrice = listItem.newPrice || 0;
  } );

  const newlistitems = lodash.sortBy(listItems, ["item.market.name","item.name"], ["asc","asc"]);

  return newlistitems;
}
