// Create market from prisma/schema.prisma
"use server";

import prisma from "@/prisma/client";

// type of item
type List = {
  name: string;
  userId: string;
};

export async function CreateList(list: List) {

  // Use current user id

  await prisma.list.create({
    data: {
      name: list.name,
      userId: list.userId,
    },
  });
}
