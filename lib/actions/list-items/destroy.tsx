"use server";

import prisma from "@/prisma/client";

type ListItem = {
  id: number;
  listId: number;
  itemId: number;
  amount: number;
  newPrice: number | null;
  item: {
    name: string;
    price: number;
  };
};

export async function DestroyListItem(listItem: ListItem) {
  await prisma.listItem.delete({
    where: {
      id: listItem.id,
    },
  });
}
