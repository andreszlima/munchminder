"use server";

import prisma from "@/prisma/client";

type ListItem = {
  itemId: number;
  listId: number;
  amount: number;
  newPrice?: number;
};

export async function AddItemToList(formData: ListItem) {
  const item = await prisma.listItem.create({
    data: {
      listId: formData.listId,
      itemId: formData.itemId,
      amount: formData.amount,
      newPrice: formData.newPrice,
    },
  });
  return item;
}