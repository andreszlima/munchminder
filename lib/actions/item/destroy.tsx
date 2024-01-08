// Create market from prisma/schema.prisma
"use server";

import prisma from "@/prisma/client";

// type of market
type Item = {
  id: number
};

export async function DestroyItem(item: Item) {
  await prisma.item.delete({
    where: {
      id: item.id,
    },
  });
}
