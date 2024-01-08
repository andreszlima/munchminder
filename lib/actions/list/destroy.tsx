"use server";

import prisma from "@/prisma/client";

type List = {
  id: number;
  name: string;
  userId: string;
};

export async function DestroyList(list: List) {
  await prisma.list.delete({
    where: {
      id: list.id,
    },
  });
}
