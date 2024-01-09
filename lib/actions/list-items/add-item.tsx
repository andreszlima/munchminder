"use server";

import prisma from "@/prisma/client";

type ListItem = {
  itemId: number;
  listId: number;
  amount: number;
  selected: boolean;
  newPrice?: number;
};

export async function AddItemToList(formData: ListItem) {
  const item = await prisma.listItem.create({
    data: {
      listId: formData.listId,
      itemId: formData.itemId,
      amount: formData.amount,
      selected: false,
      newPrice: formData.newPrice,
    },
  });
  return item;
}